---
title: The Trophy of the Future, version 2
author: sambrenner
type: post
date: 2015-03-25T04:08:58+00:00
path: /notes/the-trophy-of-the-future-version-2/
categories:
  - Arduino
  - Fabrication
  - Project Write-Up
  - Trophy of the Future
---
<img class="aligncenter size-medium wp-image-788" src="/img/uploads/2015/03/P3246327-800x626.jpg" alt="Trophy" />

It wasn&#8217;t quite the speedrun [I anticipated][1] when I first started working on version 2 of the Trophy, but I&#8217;m finally ready to call my work done (for now) and ship it off. Here&#8217;s a changelog of sorts:

* [Hardware] Mounted the Arduino to the base using standoffs
* [Hardware] Trimmed the cables exiting the trophy body and soldered on header pins for a clean connection
* [Hardware] Glued the base to the trophy body using Amazing Goop
* [Software] Developed and implemented [yun-easy-wifi-switch][2] to allow for user-friendly WiFi network switching
* [Software] Developed and implemented [linino-to-serial][3] for Linino -> Arduino communication
* [Software] Linino notifies Arduino of boot via linino-to-serial and displays a &#8220;loading&#8221; message until then (previously displayed nothing until boot)
* [Software] Trophy displays the full message cycle only once an hour via cron + linino-to-serial (previously was always on)
* [Software] Updated the [Python code][4] to allow for granular control over the trophy&#8217;s message buffer
* [Software] Handle errors thrown by the [Kimono][5] API
* [Software] Overhauled the [Arduino code][6] to accept communication from Linino and act accordingly

The name of the game for these revisions was an improved user experience. The WiFi switch was by far the most time-intensive task in v2, but it takes a huge amount of configuration responsibilities from the user. The loading text gives immediate feedback that nothing is broken. And the new trophy message cycle (once when Linino boots and then on every subsequent hour) makes the trophy far less annoying.

Here are some pictures of the hardware changes. These changes were also driven by the need to make things easier for the user &#8212; basically, taking three loosely-connected things and turning them into one solidly-connected thing. First, I inserted the standoffs by drilling a small hole and hammering them down (nylon threads don&#8217;t cooperate with hard wood).

<img class="aligncenter size-medium wp-image-784" src="/img/uploads/2015/03/P2166277-800x600.jpg" alt="OLYMPUS DIGITAL CAMERA" />

You can see that I slightly messed up the position of the top-right standoff, so that one doesn&#8217;t get a screw. Three is all you need!

<img class="aligncenter size-medium wp-image-785" src="/img/uploads/2015/03/P2166278-800x462.jpg" alt="OLYMPUS DIGITAL CAMERA"  />

I used masking tape to temporarily connect the trophy to the base. Old me had accidentally placed the embedded copper wires too far forward in the cast, so they butted right up against the Arduino at the point where they exit the resin. I had to trim down the Arduino&#8217;s ICSP pins (the 3&#215;2 arrangement of pins in the top-center of the board) to let them clear.

<img class="aligncenter size-medium wp-image-786" src="/img/uploads/2015/03/P2166285-800x462.jpg" alt="OLYMPUS DIGITAL CAMERA" />

Then I bent the wires in to place. Old me also ordered these incorrectly (see how power and ground cross over the rest of the wires). I couldn&#8217;t have flipped the board because the ethernet and USB ports need to be accessible. Not that big of a deal; I had plenty of wire to work with. I bent them to roughly hit the points on the board where they belonged.

<img class="aligncenter size-medium wp-image-787" src="/img/uploads/2015/03/P2166287-800x600.jpg" alt="OLYMPUS DIGITAL CAMERA" />

Finally, I snipped the wires to length and soldered a header pin perpendicular to the copper core. I ended up wrapping these with a tiny bit of electrical tape to be extra careful. Overall, it&#8217;s pretty solid, especially with the trophy glued to the base (not pictured).

<img class="aligncenter size-medium wp-image-783" src="/img/uploads/2015/03/P2166288-800x600.jpg" alt="OLYMPUS DIGITAL CAMERA" />

So what for version 3? Probably some aesthetic improvements &#8211; perhaps a 1/4&#8243; thick copper strip where the resin joins the wood? Another thing I&#8217;d like to add is an &#8220;on demand&#8221; button so that the trophy&#8217;s owner can see the message cycle at their convenience. And of course, doing more with those LEDs besides just scrolling text across them. But that will have to wait until next year!
To read about version 1 of the trophy, refer to these posts about its [development][7] and [fabrication][8].

 [1]: /notes/yun-easy-wifi-switch/
 [2]: https://github.com/sambrenner/yun-easy-wifi-switch
 [3]: https://github.com/sambrenner/linino-to-serial
 [4]: https://github.com/sambrenner/future-trophy/blob/master/trophy.py
 [5]: http://www.kimonolabs.com/
 [6]: https://github.com/sambrenner/future-trophy/blob/master/trophy.ino
 [7]: /notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-2-programming/
 [8]: /notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-1-fabrication/
