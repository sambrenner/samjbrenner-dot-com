---
title: 'Intro to the Asterisk dialplan: Phoneoke'
author: sambrenner
type: post
date: 2013-02-11T17:46:25+00:00
path: /notes/intro-to-the-asterisk-dialplan-phoneoke/
enclosure:
  - |
    http://samjbrenner.com/img/uploads/2013/02/documentation.mp3
    1067884
    audio/mpeg
categories:
  - Redial
  - Asterisk
  - ITP
---

In [Redial][1], we&#8217;ve started working with Asterisk to create our own phone systems. In class, we share a common phone number and each have our own extension, which, when dialed, runs our code. After looking through the [available Asterisk commands][2], I decided I wanted to have the caller record their voice and have Asterisk play it back, except mixed with a backing track (in this case, the chorus to [TLC&#8217;s Waterfalls][3]). Here&#8217;s what that sounds like (with apologies to TLC):

<audio id="wp\_mep\_1" src="/img/uploads/2013/02/documentation.mp3" controls="controls" preload="none" > </audio>

After the caller records his voice, I use Asterisk&#8217;s <code class="codecolorer text default">&lt;span class="text">System</code> command to run [SoX][4], a command line tool that mixes the caller&#8217;s voice with the backing track and converts it to the correct format for playback. A few issues I ran in to concerning playback:
  * Asterisk&#8217;s <code>Playback</code> command requires no file extension on the end. I was adding .wav and this caused errors.
  * Despite both the caller&#8217;s recording and my backing track being in the correct format for playback, the mixed file wasn&#8217;t and playback would fail. After mixing the files with <code>sox -m /path/to/file1.wav /path/to/file2.wav /path/to/mix.wav</code>, I then had to run <code>sox /path/to/mix.wav -t raw -r 8000 -e signed-integer -b 16 -c 1 /path/to/remix.sln</code> to ensure that the audio file&#8217;s properties met Asterisk&#8217;s requirements (8000 Hz, 16 bit, etc). Those two commands could probably be combined into one and I will look in to that as this project continues.

Since the application will probably be short-lived as I continue to experiment with it, I&#8217;m going to leave the phone number and extension out of this post and save it for later (though you can probably find it by following the right links&#8230;).

 [1]: http://www.itp-redial.com/class/
 [2]: http://www.voip-info.org/wiki/view/Asterisk+-+documentation+of+application+commands
 [3]: https://www.youtube.com/watch?v=8WEtxJ4-sh4
 [4]: http://sox.sourceforge.net/
