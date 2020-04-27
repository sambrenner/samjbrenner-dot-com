---
title: Announcing SkyDesigner! Sam Brenner joins the Labs
author: sambrenner
type: post
date: 2014-05-05T14:40:32+00:00
path: /notes/announcing-skydesigner-sam-brenner-joins-the-labs/
dsq_thread_id:
  - "2663007790"
categories:
  - Cooper Hewitt
  - Experimental
tags:
  - Cooper Hewitt
churl: http://labs.cooperhewitt.org/2015/visual-consistency-tweaking-the-online-collection/
---
As part of my application for my position at the Cooper Hewitt museum, I built [SkyDesigner][2], a web application that lets users replace the color of the sky with a picture of a similarly-colored object from the Cooper Hewitt’s collection. The “sky” idea comes from the original assignment, which was to create an application using both a weather API and the [Cooper Hewitt API][3], but you can use SkyDesigner to swap out colors from anything you can take a picture of. [Give it a try now][2]!

<img style="width: 50%;" class="alignnone size-full wp-image-2609" src="/img/uploads/2014/05/687474703a2f2f7777772e73616d6a6272656e6e65722e636f6d2f70726f6a656374732f736b792f6c69622f696d672f30312e6a7067.jpg"  />

<img style="width: 50%;" class="alignnone size-medium wp-image-2610" src="/img/uploads/2014/05/687474703a2f2f7777772e73616d6a6272656e6e65722e636f6d2f70726f6a656374732f736b792f6c69622f696d672f30322e6a7067.jpg"  />

Here’s how it works: first, users take a picture. If they’re on a computer, they can use their webcam. If they’re on a smartphone, they can use the built-in camera. Android users get (in my opinion) the better experience, because Android supports [getUserMedia][5] &#8211; this means that users can start their camera and take a picture without ever having to leave the application. [iOS doesn’t support getUserMedia][6] yet, so they are sent off to the native iOS camera app to take their picture, which then gets passed back to the browser. Once I receive the picture, I load it into a canvas.

In the next step, users tap on their picture to select a color. The color’s hex code is sent straight to the Cooper-Hewitt API’s [search][7] method, where I search for similarly-colored objects that have an associated image. While waiting for a response from the API, I also tell the canvas to make every pixel within range of the selected color become [transparent][8]. When I get the image back from the API, I load it in behind the canvas and presto! It shows through where the selected color used to be. Finally, the image is titled based on the object’s creator and your current weather information.

It’s built using HTML, CSS and JavaScript. The original application had PHP to talk to the API but that’s since been ported to JavaScript since I now have the luxury of running the site on the Collections website itself where we have our own built-in API hooks.

Being a weekend project, there are some missing features &#8211; sharing is a big one &#8211; but I think it demonstrates the API’s ability to provide fresh, novel ways into a museum’s vast collection. [Here’s the link again][2], and you can also find the source on [GitHub][9].

 [1]: http://labs.cooperhewitt.org/2015/visual-consistency-tweaking-the-online-collection/
 [2]: https://collection.cooperhewitt.org/play/skydesigner/
 [3]: https://collection.cooperhewitt.org/api/
 [4]: /img/uploads/2016/03/Screenshot_2014-05-01-17-45-40.png
 [5]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia
 [6]: http://caniuse.com/stream
 [7]: https://collection.cooperhewitt.org/api/methods/cooperhewitt.search.objects
 [8]: http://www.hmp.is.it/creating-chroma-key-effect-html5-canvas/
 [9]: https://github.com/sambrenner/skydesigner
