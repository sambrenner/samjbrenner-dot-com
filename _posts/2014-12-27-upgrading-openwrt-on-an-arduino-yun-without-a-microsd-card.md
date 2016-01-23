---
layout: post
title: Upgrading OpenWrt on an Arduino Yun Without a MicroSD Card
date: 2014-12-27 01:25:19.000000000 -05:00
categories: []
tags:
- Arduino
- Arduino Yun
- OpenWrt
- Trophy of the Future
type: post
---
An entire fantasy football season has passed since finishing the <a href="http://samjbrenner.com/notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-2-programming/">Trophy of the Future</a>, my "world's first internet-connected fantasy football trophy," and my league has a new champion. That means it's time to revisit the project to tie up some loose ends! More on that will come in time, but first I want to share the solution to the initial problem I encountered.

I wanted to upgrade the Yun to the latest version of <a href="https://openwrt.org/">OpenWrt</a> because opkg was throwing weird "failed to download" errors. From scanning the Arduino forums, it seemed like updating OpenWrt was the recommended first step (and as it turns out, the update also <a href="http://blog.arduino.cc/2014/04/23/upgrading-the-openwrt-yun-image-on-the-yun/">fixes Heartbleed</a>, so it's worth doing anyway). The instructions assume you have a MicroSD mounted in your Yun, which I don't, but it is still possible to do the upgrade without one.

The OpenWrt image clocks in at 16 MB, and by running `df -h` I saw that the Yun's onboard memory had around 20 MB free in the `/tmp` directory. I downloaded the <a href="http://arduino.cc/en/Main/Software#toc8">latest Yun image from the Arduino website</a> and unzipped it on my Mac, then used `scp` to move the file to the Yun:

{% highlight bash %}
scp openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin root@arduino.local:/tmp/
{% endhighlight %}

According to <a href="http://arduino.cc/en/Tutorial/YunSysupgrade">Arduino's upgrade guide</a>, the next step would be to run `run-sysupgrade` on the OpenWrt image, but a second problem surfaces here. It turns out that the first thing `run-sysupgrade` does is copy the image to `/tmp`, which errors because the file already exists. I could move the file to a subdirectory so `run-sysupgrade` could copy it back, but the Yun's onboard memory doesn't have enough space for that.

The solution here, noted on <a href="http://wiki.openwrt.org/doc/howto/generic.sysupgrade">OpenWrt's system upgrade page</a>, is to use `sysupgrade` - note the lack of `run-` in that command's name. Like this:

{% highlight bash %}
sysupgrade /tmp/openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin
{% endhighlight %}

Three minutes later, you have upgraded OpenWrt on your Arduino Yun! All the configurations should be the same, but you will have to reinstall any opkg packages.
