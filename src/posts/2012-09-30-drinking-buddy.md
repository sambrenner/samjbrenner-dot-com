---
title: Drinking buddy
author: sambrenner
type: post
date: 2012-09-30T19:54:55+00:00
path: /notes/drinking-buddy/
categories:
  - ITP
  - Physical Computing
  - Sensors
---
For the audio lab in PComp, I built the Drinking Buddy. He just wants to sing [German drinking songs][1] with you! And even though he probably thinks the more he drinks, the better he gets&#8230; that just isn&#8217;t true. As your breath alcohol increases, more error is introduced into the playback of the song. To wit:

<div class="video-embed"><iframe src="https://player.vimeo.com/video/50483324" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

The alcohol sensor ([MQ-3 from SparkFun][2]) was fun to play with, once I got it working. Every MQ-3-related blog post you come across will mention its misleading datasheet, and it&#8217;s true, it was a pain to hook up. I nearly gave up after trying many different configurations, but then I found [this blog post][3] that set me in the right direction. First, I was confused about which direction the sensor needed to be installed in, since the diagram shows the left and right pins serving different functions despite the casing having no indication of pin name, however it seems that this is a nonissue. Second, the device has a recommended 48 hour break-in period, so it was hard to tell if I had everything wired correctly but was just getting noisy data, or if my wiring was off.

Here&#8217;s how I ended up wiring it: I pass 5 volts through the &#8220;H&#8221; pins. They are the middle ones on either side. Various blogs recommended that you do not use the Arduino&#8217;s 5v output for this, so I hooked up a 9v battery with a voltage regulator. I also put 5 volts into the &#8220;A&#8221; pin, which can be either of the pins to the side of the +5 &#8220;H&#8221; pin. The &#8220;B&#8221; pin, located opposite of the &#8220;A&#8221; pin, gets grounded via a 220 ohm resistor and then sent to the Arduino&#8217;s analog in (I believe this is called a pull-up resistor?). The Sensor Workshop blog post I linked before has the analog out coming from the &#8220;H&#8221; pin, however this didn&#8217;t work for me (nor would I expect it to, I&#8217;m not sure why they have it that way).

At that point it was clear that when I blew alcohol across the sensor (using hand sanitizer as my &#8220;test booze&#8221;), the Arduino registered a higher output value. After leaving it on for 5 or so hours today, it works even better. One funny aspect of the sensor is its &#8220;hangover&#8221; period: it will continue to register alcohol in its sensor even after you&#8217;ve blown it over.

The audio aspect of the program was a lot of fun. First, I had to transcribe the song into a format that the Arduino would understand. I downloaded a midi file of the song and opened it in [Harmony Assistant][4], which revealed the musical notation. I took those notes and charted them out, as can be seen below.

<img class="aligncenter size-full wp-image-137" title="P9272101" alt="" src="/img/uploads/2012/09/P9272101.jpg"  />

Finally, I entered that info into code using the [Pitches.h][5] library.

~~~cpp
int melody[] = {
  NOTE_D3, NOTE_B2, NOTE_D3, NOTE_B2,
  NOTE_C3, NOTE_C3, NOTE_B2, NOTE_C3, NOTE_D3, NOTE_B2, NOTE_G3, NOTE_D3,
  NOTE_D3, NOTE_B2, NOTE_D3, NOTE_B2,
  NOTE_C3, NOTE_C3, NOTE_B2, NOTE_C3, NOTE_A2, NOTE_G2,
  NOTE_A2, NOTE_B2, NOTE_D3, NOTE_A2, NOTE_B2, NOTE_C3, NOTE_D3, NOTE_B2,
  NOTE_A2, NOTE_B2, NOTE_C3, NOTE_A2, NOTE_B2, NOTE_C3, NOTE_D3, NOTE_B2,
  NOTE_D3, NOTE_B2, NOTE_D3, NOTE_B2,
  NOTE_C3, NOTE_C3, NOTE_B2, NOTE_C3, NOTE_A2, NOTE_G2
};

int durations[] = {
  4, 4, 4, 4,
  8, 16, 16, 8, 8, 8, 8, 4,
  4, 4, 4, 4,
  8, 16, 16, 8, 8, 2,
  8, 8, 8, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 8, 8, 8,
  4, 4, 4, 4,
  8, 16, 16, 8, 8, 2
};
~~~

To &#8220;drunkify&#8221; the notes, I wrote a function that randomly changes the pitch and duration values. Since the Pitches.h constants only represent integer values, you can increase or decrease the pitch by increasing or decreasing the value. Same with note duration, except since that uses milliseconds, I just add or subtract a larger number. The drunkenness parameter changes both the likelihood that a pitch will be altered and the intensity with which it will be altered.

~~~cpp
void drunkifyNote(int pitch, int duration, float drunkenness) {
  boolean drunkifyPitch = binaryRandomWithProbability(drunkenness);
  boolean drunkifyDuration = binaryRandomWithProbability(drunkenness);

  if(drunkifyPitch) pitch += (random(20) * drunkenness) – 10;
  if(drunkifyDuration) duration += (random(200) * drunkenness) – 100;

  tone(speakerPin, pitch, duration);

  delay(duration + 30);
}

boolean binaryRandomWithProbability(float probability) {
  int rand = random(100);
  boolean returnVal = false;
  if(probability * 100 > rand) returnVal = true;
  return returnVal;
}
~~~


After plugging in the sensor&#8217;s value, I was all set! Below, pictures of the complete setup and a close-up of the MQ-3.

<img class="aligncenter size-full wp-image-136" title="P9292122" alt="" src="/img/uploads/2012/09/P9292122.jpg" />
<img class="aligncenter size-full wp-image-135" title="P9292124" alt="" src="/img/uploads/2012/09/P9292124.jpg"  />

 [1]: http://www.youtube.com/watch?v=Y5ryo-cd-EU
 [2]: https://www.sparkfun.com/products/8880
 [3]: http://sensorworkshop.blogspot.com/2008/04/sensor-report-mq3-gas-sensor.html
 [4]: http://www.myriad-online.com/en/products/harmony.htm
 [5]: https://code.google.com/p/arduino/source/browse/trunk/build/shared/examples/Digital/toneMultiple/pitches.h?r=943
