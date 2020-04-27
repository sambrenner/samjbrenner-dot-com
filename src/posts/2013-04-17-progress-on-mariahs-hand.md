---
title: Progress on Mariah’s Hand
author: sambrenner
type: post
date: 2013-04-17T00:52:33+00:00
path: /notes/progress-on-mariahs-hand/
categories:
  - Data Representation
  - ITP
  - Mariah Carey
---
For my Data Rep final, I am comparing the position of Mariah Carey&#8217;s hand to the note that she is singing and re-imagining her melodies as if played by an invisible theremin. See [here][1] for my initial post.

Work has been coming along well. This past week, I completed my two data collection tasks: track her hand and identify frames in which she begins singing a note.

## Stabilizing the Video Clip
To get the most accurate hand positions I could from the clip, I had to remove any trace of camera movement. This was pretty tough, but I think I did a good job. To remove the camera&#8217;s X and Y axis motion, I tracked the tiny tuft of hair in the middle of her head using After Effects (failed tracking points included her right eye, the point where her dress meets her left thigh, and her right nostril) and adjusted the video to keep its position constant. The hair tuft turned out to be a good choice because when it came to removing Z axis motion, all I had to do was adjust the scale of the video using the tuft as my anchor point and her chin as a reference point. There are few enough zooms and dollies where I could do this step without needing the After Effects tracker. That video looks like this:

<div class="video-embed"><iframe src="https://player.vimeo.com/video/64190225" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>

## Tracking the Hand

Next, I needed to track her hand. Doing this with the After Effects tracker proved too time-consuming and error-prone, so in my Ultimate Hat Tip to [White Glove Tracking][2], I crowdsourced this step (remember crowdsourcing?). Using CakePHP, I built a website that loaded each frame into the browser and asked the viewer to click on Mariah&#8217;s right hand index finger tip. Within a few hours, my database was full of tracking points.

<img class="aligncenter size-medium wp-image-408" alt="Screen Shot 2013-04-16 at 8.15.48 PM" src="/img/uploads/2013/04/Screen-Shot-2013-04-16-at-8.15.48-PM-600x544.png" />

## Finding the Notes
So I know which tracking points to sample, I needed to find the frames on which Mariah starts (and, sometimes, ends) notes. There are probably some neat ways to do this using audio analysis tools or mathematically evaluating the tracked points, but I did it the old fashioned way, by scrubbing through the video and hearing it for myself.

<div class="video-embed"><iframe src="https://player.vimeo.com/video/64192782"  frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>


## The Data

If you&#8217;ve read this far, you deserve a prize. [Here you go][3]! All the data I&#8217;ve collected. This will probably change before the end of the project, primarily because I need to interpolate her hand position based on frames where her hand isn&#8217;t visible. There&#8217;s an important block at the end of the clip where her hand dips below the frame so I need to figure out what it should be. I would also like to go back and analyze her lyrics to pick up more trills (is that the right term? Maybe I should just call them &#8220;Mariah Warbles&#8221;) from the audio.

In the &#8220;word&#8221; column of the data, you&#8217;ll notice some words are duplicated across lines and others disappear and reappear a few frames down. The duplicated ones are for glissandi, or slides between notes. The others should just be treated as regular notes.

That&#8217;s all for now! There&#8217;s so much fun that could be had with this data that is out of my project&#8217;s scope, so I really hope other people use it. Next steps for me will be calculating new pitches, creating new sheet music and handing it off to a singer to learn.

 [1]: /notes/data-rep-final-proposal-mariahs-hand/
 [2]: http://www.whiteglovetracking.com/
 [3]: /img/uploads/2013/04/frames_view.txt
