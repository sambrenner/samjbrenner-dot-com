---
layout: post
title: Yun Easy Wifi Switch
date: 2015-01-07 05:32:02.000000000 -05:00
categories: []
tags:
- Arduino
- Arduino Yun
- Shell Script
status: publish
type: post
published: true
---

Last week, I retrieved the <a href="http://samjbrenner.com/notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-1-fabrication/">Trophy of the Future</a> from Dave, our former champion and the caretaker of the trophy for the past year. Now that I have it back, I'm speedrunning some improvements on it before shipping it off to <a href="https://www.youtube.com/watch?v=JF1chLj1fro#t=15s">another person named Dave</a>, the new champion.
When initially handed off the trophy one year ago, I noted the four things I hoped to continue working on when I got it back. To sum them up:

* Stagger message cycles so that it the program runs once an hour (i.e. make it less distracting to cats)
* Create a dead-simple way to reconfigure the Yun's wifi connection.
* Remote login / updating
* Animation on the LED array (instead of just scrolling text)

I think number 2 is the most important because the trophy functions best when connected to the internet. The former Dave had the luxury of an in-home installation, but the latter Dave lives much further away and I wanted to make configuring internet on the trophy as easy as possible. This past weekend I decided to make it happen, and the result of this work is available on <a href="https://github.com/sambrenner/yun-easy-wifi-switch/">GitHub</a>.

<img class="alignnone wp-image-764 size-medium" src="/assets/yun_with_jump-800x593.jpg" alt="yun_with_jump" width="800" height="593" />

The Yun (<a href="http://arduino.cc/en/Main/ArduinoBoardYun?from=Products.ArduinoYUN">documented here</a> and pictured above) provides a few ways to reconfigure its wireless settings. The first is through the hardware: holding down the WLAN button for 5 seconds restarts the Yun and puts it back into access point (AP) mode. In this mode, the Yun broadcasts its own network to which you can connect a laptop and use a locally-hosed website to tell it which network to use, which it will connect to (called client mode) on reboot.
The second way is automatic. If the Yun boots up and cannot connect to its last saved network in 60 seconds, it will automatically reset to AP mode and the user can continue as above.
I wanted something that would be even more foolproof -- going through AP mode is easy enough, but it is pretty slow (about 45 seconds for the Yun to boot, plus another 60 for it to not find its previous network, plus 2 x 45 second reboots). I wanted something faster and simpler.
I suspected there must be a way to reconfigure wireless settings from the command line -- after all, the web interface above has to do <em>something</em> on the backend. Sure enough, that functionality is provided by <a href="https://openwrt.org/">OpenWrt</a> (the flavor of Linux that runs on the Yun) through the <a href="http://wiki.openwrt.org/doc/uci">Unified Configuration Interface</a>, or UCI. UCI is an interface to a series of text files, stored in `/etc/config/`, that allow you to change many of the Yun's settings. The wireless config (`/etc/config/wireless`) is what we're after as it contains settings for the SSID (aka network name) and network password values. Configuring it is as easy as:

{% highlight bash linenos %}
# update value
uci set wireless.@wifi-iface[0].ssid="my new ssid"

# write to config file
uci commit wireless

#restart wifi
wifi
{% endhighlight %}

In theory, then, I should be able to have the user enter their wifi credentials into a text file on a USB flash drive on their own laptop, plug that into the Yun, have the Yun check the text file on start-up, and apply the wireless settings accordingly if it exists. After a few hours researching and coding I had the following program, which does just that.

{% highlight bash linenos %}
#!/bin/sh
# check config exist
wificfg="/mnt/sda1/wifi.cfg"
if [ -f "$wificfg" ]
then
	# load wifi config
	source "$wificfg"
	echo "Updating wifi settings:"
	echo " - SSID: $ssid"
	echo " - Key: $key"
	echo " - Encryption: $encryption"
	echo " "

	# apply to OpenWrt UCI
	# see: http://wiki.openwrt.org/doc/uci/wireless
	/sbin/uci "set" "wireless.@wifi-iface[0].ssid=$ssid"
	/sbin/uci "set" "wireless.@wifi-iface[0].key=$key"
	/sbin/uci "set" "wireless.@wifi-iface[0].encryption=$encryption"
	/sbin/uci commit wireless
	wifi
else
	echo "$wificfg was not found. Leaving wifi alone."
fi
{% endhighlight %}
  
At this point I got a little greedy -- the code above did everything I needed but it had one caveat that made the whole thing feel incomplete, especially considering my intention to open-source the program. The caveat was that my program would not work if the Yun was in AP mode. It had to have already been configured to a wireless network via one of the traditional methods for my program to work correctly. This imposed a few limitations on the usefulness of the program:

* Because it doesn't work from AP mode but runs every time on boot, I had to disable the part of the Yun that automatically reverts to AP mode if it can't find the WiFi network. If, for example, the user entered their SSID or password incorrectly and those settings got applied, the Yun would never connect and end up back in AP mode and we'd be stuck. This defeats the whole point of my program, so I turned it off by commenting out the call to another program, <a href="https://github.com/arduino/linino/blob/master/trunk/package/linino/yun-scripts/files/usr/bin/wifi-live-or-reset">wifi-live-or-reset</a>, that also runs on boot.
* But now because wifi-live-or-reset never runs, the only way to get the Yun back into AP mode (which at this point I consider a dev setting and not something I want to happen when the trophy is "deployed") is via the hardware button or by connecting over Ethernet. I plan on mounting the Yun to the back of the trophy's wooden stand this week, where it will be exposed and easy to access the hardware controls. If someone else wanted to use this program but had their Yun in a less accessible location, it would take much more effort to reset the wifi if something goes wrong.

I started writing this all out as a big caveat in the readme (I have <a href="http://www.aaronland.info/weblog/">Aaron's</a> "simplest, dumbest thing" mantra in the back of my head this whole time), but halfway through I just figured that it can't be <em>that </em>hard to make my script get along with AP mode.

Long story short, I spent the entire next day doing any one of inspecting the settings in AP mode vs. those in a functioning and non-functioning client mode, waiting for the Yun to restart, or tweaking my code to try and set the right settings (as it turns out, I also needed UCI to modify DHCP and network settings in addition to the wireless settings). This ate up a lot of time and was generally very tedious. The final piece was figuring out I needed to perform one final restart and then it was just a matter of wrapping my code up into a presentable format. Here's the program with those additions:

{% highlight bash linenos %}
#!/bin/sh
UCI="/sbin/uci"
# set_or_delete is borrowed from /etc/init.d/handle_wifi_reset
set_or_delete() {
    key=$1
    value=$2
    if [ "x$value" == "x" ]
    then
	$UCI delete "$key"
    else
	$UCI set "$key=$value"
    fi
}

# check config exist
wificfg_a="/mnt/sda1/wifi.cfg"
wificfg_b="/mnt/sdb1/wifi.cfg"
cfg_load=false

# load config
if [ -f "$wificfg_a" ] ; then
    source "$wificfg_a"
    cfg_load=true
fi

if [ -f "$wificfg_b" ] ; then
    source "$wificfg_b"
    cfg_load=true
fi

if [ "$cfg_load" = true ] ; then
    # check if we are coming out of a self-induced reboot
    if [ -f /root/easy-wifi-switch-reboot ] ; then
        rm /root/easy-wifi-switch-reboot
        echo "all done!"
        exit 0
    fi

    # otherwise do the actual switching
    echo "Updating wifi settings:"
    echo " - SSID: $ssid"
    echo " - Key: $key"
    echo " - Encryption: $encryption"
    echo " "

    # apply to OpenWrt UCI
    # WIRELESS: see http://wiki.openwrt.org/doc/uci/wireless
    $UCI "set" "wireless.@wifi-device[0].channel=auto"
    $UCI "set" "wireless.@wifi-iface[0].mode=sta"
    $UCI "set" "wireless.@wifi-iface[0].ssid=$ssid"
    $UCI "set" "wireless.@wifi-iface[0].encryption=$encryption"
    $UCI "set" "wireless.@wifi-iface[0].key=$key"

    # NETWORK
    $UCI "delete" "network.lan.ipaddr"
    $UCI "delete" "network.lan.netmask"
    PROTO=`$UCI get "arduino.lan.proto"`
    set_or_delete "network.lan.proto" $PROTO

    # DHCP
    $UCI "delete" "dhcp.@dnsmasq[0].interface"
    $UCI "add_list" "dhcp.@dnsmasq[0].interface=lo"

    # COMMIT
    $UCI commit

    # RESTART
    /bin/touch /root/easy-wifi-switch-reboot
    /sbin/reboot
else
    echo "wifi.cfg was not found. Leaving wifi alone."
fi
{% endhighlight %}

In the end, the requirement to disable wifi-live-or-reset was removed and now recipients of my trophy can switch the Yun's wifi network from AP mode or from client mode all day long with nothing more than a text file on a jump drive. This extra bit of functionality did end up taking longer than I would have liked, but I did learn a lot about how devices connect to wifi networks so I consider it time well spent.

I do hope someone out there will find this useful! Send me an email if you end up using it. You can grab all the code on <a href="https://github.com/sambrenner/yun-easy-wifi-switch/">GitHub</a>.
