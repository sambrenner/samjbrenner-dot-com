---
layout: post
title: Mariah Carey's Hand
date: 2013-06-22 18:15:10.000000000 -04:00
categories:
- Project Writeup
tags:
- Data Representation
- ITP
- Mariah Carey
- PHP
- Processing
- Featured
status: publish
type: post
published: true
description: |
    An experiment to find how accurately the position of Mariah Carey's hand reflects the pitch of the note she is singing during a live performance.

    You can [read more about the project on my blog](/notes/mariah-careys-hand).
thumbnail: /assets/mariah-600x264.jpg

---
<div class="embed-responsive embed-responsive-16by9">
	<iframe src="https://player.vimeo.com/video/66652115" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

## Purpose

To explore how accurately the position of <a href="http://en.wikipedia.org/wiki/Mariah_Carey">Mariah Carey’s</a> hand during live performance reflects the pitch of the note she is singing.

## Hypothesis
I hypothesize that Mariah’s hand is not a perfect representation of the pitch but will produce a melody that is recognizable as the original song.

## Procedures

### Find a Clip
Over the course of a week, I watched hours of Mariah Carey footage from awards show performances to full concert DVDs to find a clip from which to base my experiment. A lot of the footage would momentarily show Mariah waving her hand around but would quickly cut to a close-up of her face. This was not good enough, as I required the clip to show uninterrupted hand movement for as long as possible. Eventually I found a segment from Mariah’s 1999 <a href="http://en.wikipedia.org/wiki/Around_the_World_%28video%29">“Around The World” tour DVD</a> which would be usable. It was a 40 second clip from the final chorus from “<a href="https://www.youtube.com/watch?v=mIhI23gBBPQ">My All</a>,” the fifth single to be released from Mariah’s 1997 album “<a href="http://en.wikipedia.org/wiki/Butterfly_%28Mariah_Carey_album%29">Butterfly</a>.” The clip had some minor camera movement which I would be able to undo. Most importantly, the clip showed Mariah’s full body and didn’t cut away to another shot. (Update: This post used to contain the clip embedded from YouTube, but it has since been taken down.)

### Correct Camera Movement
I used Adobe After Effects (AE) to undo the slight motion of the camera in the source clip. To correct for motion along the X and Y axes, I used AE’s built-in tracker to follow a small curl of hair coming from the top of Mariah’s head. To correct for the Z axis motion, I scaled the source video so that Mariah’s head maintained a constant pixel-height, also using AE.

<div class="embed-responsive embed-responsive-16by9">
	<iframe src="https://player.vimeo.com/video/64190225" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

### Track Hand
I found AE’s built-in tracker unable to handle Mariah’s hand perfectly because she waved it around too much and the video quality wasn't optimal. To get accurate position data, I needed to do this task manually. Initially, I went through the video by myself, frame by frame, marking the position of her hand. With a combination of the AE tracker for slower parts, I was able to produce this brief sonification test:

<div class="embed-responsive embed-responsive-16by9">
	<iframe src="https://player.vimeo.com/video/63577351" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

I was reminded, however, of <a href="http://whiteglovetracking.com/">White Glove Tracking</a>, a 2007 project by <a href="http://blog.evan-roth.com/">Evan Roth</a> and <a href="http://www.benengebreth.org/">Ben Engebreth</a>. In an effort to track Michael Jackson’s glove during his <a href="https://www.youtube.com/watch?v=M8N5FxRFUDM#t=8m50s">first nationally-televised performance of “Billie Jean,”</a> Roth and Engebreth split the video into its individual frames and built a website that gave a user one frame and asked them to click on the hand. In 72 hours, they tracked over 10,000 frames. I decided that this was the best way to complete the tracking for my video, so I built a similar website using CakePHP. It took about a day to build the site, and after sending it out to ITP’s student email list, it took another seven hours for all 950 frames to be tracked.

<img class="alignnone size-medium wp-image-408" alt="Screen Shot 2013-04-16 at 8.15.48 PM" src="/assets/Screen-Shot-2013-04-16-at-8.15.48-PM-600x544.png" width="600" height="544" />

### Transcribe Original Music
I found the sheet music from Mariah’s studio recording of “My All” online. In the live performance, she sang some slightly different notes with slightly different timing, so I made adjustments using MuseScore, a free musical notation software package.

### Link Music Note to Frame Number
In order to know from which frame to source Mariah’s hand position from, I needed to link every note in the music with a frame number in the video. This was a fairly simple conversion. Given that:

- ♩ = 54 bpm (or 1.11 bps) in the source video
- Source video = 25 fps

I could calculate that ♩ = 27.77 frames. Using this value, I was able to assign a frame number for every note in the sheet music.

### Generate New Pitches

In the original recording of the song, Mariah sings a low note of G3 (G below middle C) and a high note of F5 (two Fs above middle C). This gives a range of 23 notes on the chromatic scale. To generate new pitches for my modified music, I would map her hand position from the range of [lowest hand Y, highest hand Y] to [0,22]. The resulting number represented the new pitch. For example, if her hand fell just below the middle of all possible hand Y values, it would be remapped into the number 11. On the chromatic scale, 11 notes above G3 is F#4. Pictured below is the final sheet music.

<a href="http://samjbrenner.com/notes/wp-content/uploads/2013/06/mariah.jpg"><img class="alignnone size-medium wp-image-438" alt="mariah" src="/assets/mariah-600x264.jpg" width="600" height="264" /></a>

### Perform
Andrea Kahn, a roommate of a fellow ITP student and classically trained alto, learned and performed the modified music for me. After the recording session, I discovered a bug in my code that had caused me to miscalculate the pitch of a note. The erroneous note accompanies the word "to" in the 5th measure. Something I realized about data representation through this project is that sometimes representations of data go through so many conversions, assumptions and translations to create the more appealing visual (or sound, in my case) that the accuracy of the end result must always be questioned. So the bug remains.

## Conclusion
While the waving of Mariah Carey’s hand might seem like nothing more than a diva’s tic, there appears to be a method behind her madness. The resulting melody certainly isn’t “melodic” in the contemporary Western sense of the word, but the new music has a beauty of its own. Her hand moves with big-picture accuracy - higher for high notes and lower for low ones - while she may not be so good on the small scale. Furthermore, Mariah’s largest physical motions effectively redistribute the emotional budget of the chorus since the melody now carries Mariah’s raw physical energy. And despite lacking a key, the melody is still memorable and recognizable (if even just barely) as the original song. I suspect its primary function is to aid Mariah in the memorization of an altered melody from the studio recording, but Mariah has no issue assigning it a secondary purpose of emotional emphasis.

<a href="http://samjbrenner.com/notes/wp-content/uploads/2013/06/results.jpg"><img class="alignnone size-medium wp-image-439" alt="results" src="/assets/results-600x291.jpg" width="600" height="291" /></a>

<img class="alignnone size-full wp-image-447" alt="mch" src="/assets/mch.jpg" />
