---
title: Instagramophone
author: sambrenner
type: post
date: 2013-05-10T20:20:54+00:00
path: /notes/instagramophone/
categories:
  - Asterisk
  - ITP
  - Project Write-Up
  - Redial
  - Ruby
---

Instagram takes your photos and makes them look bad, because vintage is trendy. Instagramophone imagines what would happen if phone calls worked the same way. My final project for Redial, Instagramophone* is a service that lets a user choose from five different vintage audio filters to apply to their voice. You can try it out for yourself by calling (360) 215-1975 (edit: I took down the server that ran this, so the number no longer works).

<div class="video-embed">
    <iframe src="https://player.vimeo.com/video/65925832" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

Callers are asked to choose one of five different filters for their voice, all inspired by vintage sound media. The choices are a [wax cylinder][1], an [LP record][2], an [FM radio][3], a [cassette tape][4] and [scrambled porn][5]. After recording their message, the effect is applied and played back. Callers then have the option of uploading their sound to [Soundcloud][6].
The application was built in [Asterisk][7], with [SoX][8] to do the audio processing and Ruby to upload to Soundcloud. When a user records their message, Asterisk sends the recorded file in to a shell script that does the necessary slicing and dicing to create my desired effect. The cassette tape filter, for example, looks like this:

~~~bash
#split the source recording and apply bends up and down
sox $1 /projects/instagramophone/temp/$tempConversionDir/bend.wav trim 1 bend .25,300,.25  .25,-300,.25 : newfile : restart

#recombine the split files
sox /projects/instagramophone/temp/$tempConversionDir/*.wav -c1 /projects/instagramophone/temp/$tempConversionDir/mixdown.wav

#add cassette tape sound effects to beginning and end
sox -c1 /projects/instagramophone/static/wav/cassette.wav /projects/instagramophone/temp/$tempConversionDir/mixdown.wav -c1 /projects/instagramophone/static/wav/cassetteend.wav -r 8000 -c1 /projects/instagramophone/messages/altered/$sourcefile
~~~


The scrambled porn filter is a little more complicated. After watching [this clip][9] of scrambled pay-per-view (SFW), I wanted to make my filter cut the audio in and out rapidly. I did that by splitting the recorded file in to many tiny chunks and alternating the volume up and down:

~~~bash
#split the file in to 0.1 second chunks
sox $1 /projects/instagramophone/temp/$tempConversionDir/trim.wav trim 0.1 : newfile : restart

declare -i counter=

#loop through all the chunks
for i in /projects/instagramophone/temp/$tempConversionDir/*.wav; do
counter=$counter+1
filename=${i##*/}

#alternate high and low volume
if [[ $counter%2 -eq ]]; then
sox -v2.0 $i /projects/instagramophone/temp/$tempConversionDir/$tempEffectDir/$filename
else
sox -v0.1 $i /projects/instagramophone/temp/$tempConversionDir/$tempEffectDir/$filename
fi
done

#recombine and add scrambled porn background
sox /projects/instagramophone/temp/$tempConversionDir/$tempEffectDir/*.wav /projects/instagramophone/temp/$tempConversionDir/mixdown.wav
sox -m -v1.5 /projects/instagramophone/temp/$tempConversionDir/mixdown.wav -v0.8 /projects/instagramophone/static/wav/scrambledporn.wav -r 8000 -c1 /projects/instagramophone/messages/altered/$sourcefile
~~~

Please call it up and leave a message!

*I searched the name and found that a similar project already exists with the name Instagramophone ([link][10], [GitHub][11]), so I hope they don&#8217;t mind me using it as well. Both our projects use SoX to apply effects to the voice, but that&#8217;s about as much as they have in common.

 [1]: http://en.wikipedia.org/wiki/Phonograph_cylinder
 [2]: http://en.wikipedia.org/wiki/LP_record
 [3]: http://en.wikipedia.org/wiki/Fm_radio
 [4]: http://en.wikipedia.org/wiki/Compact_cassette
 [5]: http://en.wikipedia.org/wiki/Television_encryption
 [6]: https://soundcloud.com/instagramophone
 [7]: http://www.asterisk.org/
 [8]: http://sox.sourceforge.net/
 [9]: https://www.youtube.com/watch?v=loDIbTVunUo
 [10]: http://instagramophone.info/
 [11]: https://github.com/dinalamdany/instagramophone/
