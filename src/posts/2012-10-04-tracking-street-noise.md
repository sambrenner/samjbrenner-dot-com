---
title: Tracking Street Noise
author: sambrenner
type: post
date: 2012-10-04T14:37:46+00:00
path: /notes/tracking-street-noise/
categories:
  - Physical Computing
  - Arduino
  - DIY Health
  - ITP
  - Processing
  - Sensors
---
<img class="aligncenter size-full wp-image-162" title="PA032144" alt="" src="/img/uploads/2012/10/PA032144.jpg"  />

The other day, I was talking with [Jay][1] about tracking street noise. I thought it would be neat to record a video of the street for however many hours and giving it away to anyone who wanted to extract data from it. Taxi frequency, direction of pedestrians, or noise level, for example. I mentioned how the noise from the street was impacting my sleeping, Jay said something about tracking sound, and at that moment, voilà! An idea was born.

Tracking the sound of the street below and relating it to my sleep habits is applicable to two separate classes. Our lab in Physical Computing this week is to send the output from a sensor into the computer via the serial port. Having this raw data on the desktop will open us up to all sorts of cool data visualization and analysis. Very cool. Complementing that is DIY Health, where one of the topics we&#8217;ve covered is the [Quantified Self][2] (QS) movement. QS defines itself as &#8220;a collaboration of users and tool makers who share an interest in self knowledge through self-tracking.&#8221; Also very cool. So if I could track the sound and compare it to my personal experience sleeping&#8230; you see where I&#8217;m going with this?

Fast-forward to this afternoon, when I picked up an [electret microphone][3] from my local electronic parts supplier. I had also come across this [StackExchange][4] post about how an electret mic needs to be amplified before its signal gets sent into the Arduino. The chosen answer contains this schematic:

[<img class="aligncenter size-large wp-image-163" title="XJa21" alt="" src="/img/uploads/2012/10/XJa21-1024x655.png" />][5]

It uses an operational amplifier, or &#8220;opamp,&#8221; which I had heard of but never actually used. It amplifies the relatively small voltage output of the electret 100x (see this [Talking Electronics post][6] for a good explanation with some neat animated gifs). After I set everything up on my breadboard to confirm it all worked, I hit the PCB and I am now the proud owner of&#8230;

<img class="aligncenter size-full wp-image-161" title="PA032146" alt="" src="/img/uploads/2012/10/PA032146.jpg"  />

You can see it&#8217;s precariously inserted into my Arduino and this will soon to change. Knocking it can cause the absolute mess of wire that is the non-pictured side to throw things way off. But don&#8217;t touch it, and it works. It sends its raw data to Processing via <code>Serial.write()</code> and is pretty good at picking up noise pollution when I place it by my window. Below, three images. 1) the baseline, &#8220;normal street noise&#8221; reading, 2) a truck barreling down the street, and 3) the dreaded taxi honk.

[<img class="aligncenter size-full wp-image-160" title="serial_2012-10-3-193652-baseline" alt="" src="/img/uploads/2012/10/serial_2012-10-3-193652-baseline.jpg"  />][7]

[<img class="aligncenter size-full wp-image-159" title="serial_2012-10-3-193770-truck-on-6th" alt="" src="/img/uploads/2012/10/serial_2012-10-3-193770-truck-on-6th.jpg"   />][8]

[<img class="aligncenter size-full wp-image-158" title="serial_2012-10-3-193929-honk" alt="" src="/img/uploads/2012/10/serial_2012-10-3-193929-honk.jpg"   />][9]

Here&#8217;s what I hope for this project. I would love to collect 24 hours of data to track honks, trucks, people yelling, construction etc., and use it to create a &#8220;portrait&#8221; of this particular intersection. I could track sound overnight and couple it with data from [Sleep Cycle][10] to see if there is any correlation between outside noise and disturbances in my sleep. I could film the traffic light and combine it with the sound data to could calculate the average driver&#8217;s response time between a light turning green and them honking. Lots more to explore!

 [1]: http://www.jayrz.com/wp/
 [2]: http://quantifiedself.com/
 [3]: http://en.wikipedia.org/wiki/Electret_microphone
 [4]: http://electronics.stackexchange.com/questions/16529/why-is-microphone-opamp-arduino-circuit-not-working
 [5]: /img/uploads/2012/10/XJa21.png
 [6]: http://talkingelectronics.com/projects/OP-AMP/OP-AMP-1.html
 [7]: /img/uploads/2012/10/serial_2012-10-3-193652-baseline.jpg
 [8]: /img/uploads/2012/10/serial_2012-10-3-193770-truck-on-6th.jpg
 [9]: /img/uploads/2012/10/serial_2012-10-3-193929-honk.jpg
 [10]: http://www.sleepcycle.com/
