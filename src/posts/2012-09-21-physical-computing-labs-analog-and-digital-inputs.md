---
title: 'Physical Computing labs: Analog and digital inputs'
author: sambrenner
type: post
date: 2012-09-21T13:09:35+00:00
path: /notes/physical-computing-labs-analog-and-digital-inputs/
categories:
  - Physical Computing
  - ITP
  - Sensors
---
<img class="aligncenter size-full wp-image-103" title="P9202066" alt="" src="/img/uploads/2012/09/P9202066.jpg"  />
For this week&#8217;s Physical Computing labs, we covered two topics: digital inputs and analog inputs.

The analog assignment was to recreate a &#8220;luv-o-meter,&#8221; as found in dive bars across the country. Instead of grip pressure, I used a [sonar rangefinder][1] to detect proximity. This triggered lights on an [RGB LED Strip][2] (as previously seen in [&#8220;Windows 95 Flying Through Space Screensaver: The Costume&#8221;][3], from the CP+B holiday party) to illuminate as the user approached.

<div class="video-embed">
<iframe src="https://player.vimeo.com/video/49883812"  frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

<img class="aligncenter size-full wp-image-104" title="P9202071" alt="" src="/img/uploads/2012/09/P9202071.jpg"  />

Here&#8217;s a closeup of the rangefinder. It&#8217;s straightforward to use: supply it with 5 volts, ground it, and connect its analog output to the Arduino&#8217;s analog input. What the Arduino gets is a number from 0 (closest) to around 250 (farthest away). I scale that number from 0-16, for how many lights on the strip should illuminate, and tell the strip to do its thing.

The digital input lab involved making some sort of &#8220;locking&#8221; mechanism. I was inspired by this neat little 8-in-1 switch that I picked up at our local electronic parts supplier:

<img class="aligncenter size-full wp-image-99" title="P9202076" alt="" src="/img/uploads/2012/09/P9202076.jpg"  />

Using the switch, I built a &#8220;lock&#8221; where a green LED will only illuminate when the correct code is entered. Users also have the ability to change the code to something of their own choosing. Here&#8217;s a video of it in action:

<div class="video-embed"><iframe src="https://player.vimeo.com/video/49882879" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

You can see when I change the switch from &#8220;00000000&#8221; to &#8220;11000000,&#8221; the green LED turns off and the red LED turns on, meaning the code is incorrect. By connecting the circuit on the right side of my breadbord, I enter &#8220;set code&#8221; mode, and whatever position the switches are in when that circuit is disconnected becomes the new lock code. The security flaws in this are many, but fortunately the illumination of a green LED isn&#8217;t exactly a bounty worth &#8220;lockpicking&#8221; for.

 [1]: http://www.maxbotix.com/documents/MB1010_Datasheet.pdf
 [2]: http://adafruit.com/products/306
 [3]: /img/uploads/2012/09/PC140094.jpg
