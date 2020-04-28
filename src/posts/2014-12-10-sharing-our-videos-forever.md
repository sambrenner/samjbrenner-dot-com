---
title: Sharing our videos, forever
author: sambrenner
type: post
date: 2014-12-10T16:29:12+00:00
path: /notes/sharing-our-videos-forever/
dsq_thread_id:
  - "3310808829"
enclosure:
  - |
    https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_1080.mp4
    156842223
    video/mp4
  - |
    https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_1080_s.mp4
    156842223
    video/mp4
  - |
    https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_720.mp4
    156990437
    video/mp4
  - |
    https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_720_s.mp4
    156990437
    video/mp4
categories:
  - Backends
  - CH 3.0
  - Cooper Hewitt
  - Publishing
  - Video
tags:
  - Cooper Hewitt
churl: http://labs.cooperhewitt.org/2014/sharing-our-videos-forever/
---

Our galleries and Pen experience are driven by the idea that everything a visitor can see or do in the museum itself should be accessible later on.

Part of getting the [collections site][2] and [API][3] (which drives all the interfaces in the galleries designed by Local Projects) ready for reopening has involved the gathering and, in some cases, generation of data to display with our exhibits and on our new interactive tables. In the coming weeks, I&#8217;ll be playing blogger catch-up and will write about these new features. Today, I&#8217;ll start with videos.

<img class="aligncenter size-medium wp-image-2600" src="/img/uploads/2014/12/Screen-Shot-2014-12-10-at-3.09.22-PM-800x424.png" />

Besides the dozens videos produced in-house by [Katie][4] &#8211; such as the amazing [Design Dictionary][5] series &#8211; we have other videos relating to people, objects and exhibitions in the museum. Currently, these are all streamed on [our YouTube channel][6]. While this made hosting much easier, it meant that videos were not easily related to the rest of our collection and therefore much harder to find. In the past, there were also many videos that we simply didn&#8217;t have the rights to show after their related exhibition had ended, and all the research and work that went into producing the video was lost to anyone who missed it in the gallery. A large part of this effort was ensuring that we have the rights to keep these videos public, and so we are immensely grateful to Matthew Kennedy, who handles all our image rights, for doing that hard work.

A few months ago, we began the process of adding videos and their metadata in to our collections website and API. As a result, when you take a look at our page for [Tokujin Yoshioka&#8217;s Honey-Pop chair][7] , below the object metadata, you can see its related video in which our curators and conservators discuss its unique qualities. Similarly, when you visit our page for our former director, the late [Bill Moggridge][8], you can see two videos featuring him, which in turn link to their own exhibitions and objects. Or, if you&#8217;d prefer, you can just see [all of our videos here.][9]

In addition to its inclusion in the website, video data is also now available over our API. When calling an API method for an [object][10], [person][11] or [exhibition][12] from our collection, paths to the various video sizes, formats and subtitle files are returned. Here&#8217;s an example response for one of Bill&#8217;s two videos:

~~~js
{
  "id": "68764297",
  "youtube_url": "www.youtube.com/watch?v=DAHHSS_WgfI",
  "title": "Bill Moggridge on Interaction Design",
  "description": "Bill Moggridge, industrial designer and co-founder of IDEO, talks about the advent of interaction design.",
  "formats": {
    "mp4": {
      "1080": "https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_1080.mp4",
      "1080_subtitled": "https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_1080_s.mp4",
      "720": "https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_720.mp4",
      "720_subtitled": "https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059_720_s.mp4"
    }
  },
  "srt": "https://s3.amazonaws.com/videos.collection.cooperhewitt.org/DIGVID0059.srt"
}
~~~

The first step in accomplishing this was to process the videos into all the formats we would need. To facilitate this task, I built [VidSmanger][13], which processes source videos of multiple sizes and formats into consistent, predictable derivative versions. At its core, VidSmanger is a wrapper around [ffmpeg][14], an open-source multimedia encoding program. As its input, VidSmanger takes a folder of source videos and, optionally, a folder of SRT subtitle files. It outputs various sizes (currently 1280&#215;720 and 1920&#215;1080), various formats (currently only mp4, though any ffmpeg-supported codec will work), and will bake-in subtitles for in-gallery display. It gives all of these derivative versions predictable names that we will use when constructing the API response.

<img class="aligncenter size-medium wp-image-2602" src="/img/uploads/2014/12/VidsmangCartoon-800x366.png" alt="VidsmangCartoon" />

Because VidSmanger is a shell script composed mostly of simple command line commands, it is easily augmented. We hope to add animated gif generation for our thumbnail images and automatic S3 uploading into the process soon. Here&#8217;s a proof-of-concept gif generated over the command line using [these instructions][15]. We could easily add the appropriate commands into VidSmanger so these get made for every video.

<img class="aligncenter size-full wp-image-2601" src="/img/uploads/2014/12/anim.gif" alt="anim"  />

For now, [VidSmanger is open-source and available on our GitHub page!][13] To use it, first clone the repo and the run:

    ./bin/init.sh

This will initialize the folder structure and install any dependencies ([homebrew][16] and ffmpeg). Then add all your videos to the source-to-encode folder and run:

    ./bin/encode.sh

Now you&#8217;re smanging!

 [1]: http://labs.cooperhewitt.org/2014/sharing-our-videos-forever/
 [2]: https://collection.cooperhewitt.org
 [3]: https://collection.cooperhewitt.org/api
 [4]: https://labs.cooperhewitt.org/author/katieshelly/
 [5]: https://www.youtube.com/playlist?list=PLqwPGOOIhKSDEqOg8OxfciHIMTfyJa9vu
 [6]: https://www.youtube.com/user/cooperhewitt
 [7]: http://collection.cooperhewitt.org/objects/18714653/
 [8]: http://collection.cooperhewitt.org/people/18062553/
 [9]: https://collection.cooperhewitt.org/videos/
 [10]: https://collection.cooperhewitt.org/api/methods/cooperhewitt.objects.getInfo
 [11]: https://collection.cooperhewitt.org/api/methods/cooperhewitt.people.getInfo
 [12]: https://collection.cooperhewitt.org/api/methods/cooperhewitt.exhibitions.getInfo
 [13]: https://github.com/cooperhewitt/vidsmanger
 [14]: https://www.ffmpeg.org/
 [15]: http://blog.room208.org/post/48793543478
 [16]: http://brew.sh/
