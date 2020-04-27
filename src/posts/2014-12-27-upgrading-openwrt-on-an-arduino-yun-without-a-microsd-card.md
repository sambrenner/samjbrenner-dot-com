---
title: Upgrading OpenWrt on an Arduino Yun without a MicroSD card
author: sambrenner
type: post
date: 2014-12-27T01:25:19+00:00
path: /notes/upgrading-openwrt-on-an-arduino-yun-without-a-microsd-card/
categories:
  - Arduino
  - OpenWrt
  - Trophy of the Future
---

An entire fantasy football season has passed since finishing the [Trophy of the Future][1], my &#8220;world&#8217;s first internet-connected fantasy football trophy,&#8221; and my league has a new champion. That means it&#8217;s time to revisit the project to tie up some loose ends! More on that will come in time, but first I want to share the solution to the initial problem I encountered.

I wanted to upgrade the Yun to the latest version of [OpenWrt][2] because opkg was throwing weird &#8220;failed to download&#8221; errors. From scanning the Arduino forums, it seemed like updating OpenWrt was the recommended first step (and as it turns out, the update also [fixes Heartbleed][3], so it&#8217;s worth doing anyway). The instructions assume you have a MicroSD mounted in your Yun, which I don&#8217;t, but it is still possible to do the upgrade without one.

The OpenWrt image clocks in at 16 MB, and by running <code>df -h</code> I saw that the Yun&#8217;s onboard memory had around 20 MB free in the <code>/tmp</code> directory. I downloaded the [latest Yun image from the Arduino website][4] and unzipped it on my Mac, then used <code>scp</code> to move the file to the Yun:


<pre><code>scp openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin root@arduino.local:/tmp/
</code></pre>

According to [Arduino&#8217;s upgrade guide][5], the next step would be to run <code>run-sysupgrade</code> on the OpenWrt image, but a second problem surfaces here. It turns out that the first thing <code>run-sysupgrade</code> does is copy the image to <code>/tmp</code>, which errors because the file already exists. I could move the file to a subdirectory so <code>run-sysupgrade</code> could copy it back, but the Yun&#8217;s onboard memory doesn&#8217;t have enough space for that.

The solution here, noted on [OpenWrt&#8217;s system upgrade page][6], is to use <code>sysupgrade</code> &#8211; note the lack of <code>run-</code> in that command&#8217;s name. Like this:

<pre><code>sysupgrade /tmp/openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin
</pre></code>

Three minutes later, you have upgraded OpenWrt on your Arduino Yun! All the configurations should be the same, but you will have to reinstall any opkg packages.

 [1]: /notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-2-programming/
 [2]: https://openwrt.org/
 [3]: http://blog.arduino.cc/2014/04/23/upgrading-the-openwrt-yun-image-on-the-yun/
 [4]: http://arduino.cc/en/Main/Software#toc8
 [5]: http://arduino.cc/en/Tutorial/YunSysupgrade
 [6]: http://wiki.openwrt.org/doc/howto/generic.sysupgrade
