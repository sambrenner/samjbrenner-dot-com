---
title: Open Source Soundboard for Live Performance
author: sambrenner
type: post
date: 2014-06-16T03:07:26+00:00
path: /notes/open-source-soundboard-for-live-performance/
categories:
  - Experiments
  - JavaScript
  - node.js
  - Project Write-Up
---
<img class="aligncenter size-medium wp-image-683" alt="Screen Shot 2014-06-15 at 10.40.02 PM" src="/img/uploads/2014/06/Screen-Shot-2014-06-15-at-10.40.02-PM-800x529.png" width="800" height="529" />

Last semester, I needed a bare-bones soundboard to cue up and play sound clips for [AARPlane][1], the midterm performance of my Puppets class at ITP. Not knowing my way around pro audio software (which I&#8217;m sure makes this a simple task) and seeing that the current landscape of online soundboards consists of awfully-designed holdovers from the days of Flash, I decided to build my own. It&#8217;s far from full-featured &#8211; currently it will just play, pause and replay sound clips &#8211; but if you need to need a &#8220;world&#8217;s-dumbest&#8221;-style soundboard, I think you should give this a try.

Getting it up and running is straightforward-ish (and definitely needs to be straightforward-er):

1. Install [NodeJS][2]
  2. [Download the code from GitHub][3]
  3. Create a <code>sounds</code> folder inside of <code>public</code> and place all of your [web-encoded][4] audio files in it (mp3s work fine)
  4. Open the project folder in Terminal and run <code>npm install</code> followed by <code>node app</code>
  5. Point your browser to [127.0.0.1:3000][5]
  6. Click a sound to play it! Click again to pause!

All of the source code is available on [GitHub][6], along with my list of [issues][7] (I&#8217;m accepting pull requests!).

 [1]: /notes/aarplane/
 [2]: http://nodejs.org/
 [3]: https://github.com/sambrenner/soundboard/archive/master.zip
 [4]: http://en.wikipedia.org/wiki/HTML5_Audio#Supported_audio_codecs
 [5]: http://127.0.0.1:3000
 [6]: https://github.com/sambrenner/soundboard
 [7]: https://github.com/sambrenner/soundboard/issues
