---
title: On exhibitions and iterations
author: sambrenner
type: post
date: 2016-02-18T21:33:49+00:00
path: /notes/on-exhibitions-and-iterations/
categories:
  - Backends
  - Cooper Hewitt
  - Experimental
  - Interaction Design
  - Iteration
churl: http://labs.cooperhewitt.org/2016/on-exhibitions-and-iterations/
---
Since reopening in December 2014, we&#8217;ve found that the coming opening of an exhibition is a big driver of iteration. The work involved in preparing an exhibition involves the whole museum and is one of the most coordinated and planned-out things we do, and because of this, new exhibitions push us to improve in a number of ways.

First, new exhibitions can highlight existing gaps or inefficiencies in our systems. Our tagging tool, for example, always sees a round of bug fixes or new features before an exhibition because it coincides with a time when it will see heavy use. Second, exhibitions present us with new technical challenges. Objects in the [Heatherwick][2] exhibition, for example, were displayed in the galleries grouped into &#8220;projects,&#8221; which is also how we wanted users to collect them with their Pens and view them on the website. To accomplish this we had to figure out a way that TMS, our collections management software, could store both the individual objects (for internal purposes) and the grouped projects (which would hold all the public-facing images and text), and figure out how to see that through to the website in a way that made registrars, curators and ourselves comfortable. Finally, a new exhibition can present an opportunity for experimentation. [David Adjaye Selects][3] gave us the opportunity to scale up [Object Phone][4], a telephone-based riff on the audio guide, which [originally started][5] as a small, rough prototype.

Last week was the opening of our triennial exhibition &#8220;[Beauty][6],&#8221; which similarly presented us with a number of technical challenges and opportunities to experiment. In this post I&#8217;ll share some of those challenges and the work we did to approach them.

<img class="size-full wp-image-2450" src="/img/uploads/2016/03/wall.jpg" alt="Triennial's wall text, with the collect icon in the lower-right corner" />

## Collecting Exhibition Text

Since the beginning of the pen project we&#8217;ve been saying that the Pens don&#8217;t just have to collect objects. Aaron and Seb wrote in their [paper on the project][7] that &#8220;nothing would prevent the museum from allowing visitors to &#8216;collect&#8217; individual designers, entire exhibitions or even architectural elements from the building itself in the future.&#8221; To that end, we&#8217;ve experimented with [collecting shop items][8] and decided that with the triennial we would allow visitors to collect exhibition text as well.
Exhibition text (in museum argot, &#8220;A-Panel&#8221; is the main text at the beginning of an exhibition and &#8220;B-Panel&#8221; are any additional texts you might find along the way) makes total sense as something that a visitor should be able to remember for later. It explains and contextualizes an exhibition&#8217;s goals, contents and organization. We&#8217;ve had the text on our collections [since we reopened][9] but it took a few clicks to get through from a visitor&#8217;s post-visit website. Now, [the text][10] will be right there alongside all of a visitor&#8217;s objects.

<img class="size-full wp-image-2443" src="/img/uploads/2016/03/Screen-Shot-2016-02-16-at-11.17.43-AM.png" alt="The exhibition text on a post-visit website" />

The open-ended part of this is what visitors will expect when they collect an &#8220;exhibition.&#8221; We installed the collection points with no helper text, i.e. it doesn&#8217;t say &#8220;press here to collect this exhibition&#8217;s text.&#8221; We think it&#8217;s clear that the crosshairs refer to the text, but one of our original ideas was that we could have a way for the visitor to automatically collect every object in the exhibition and I wonder if that might be the implied function of the text tag. We will have to observe and adapt accordingly on that point.

## Videos Instead of Images

When we [first added videos to our collections site][11], we found that the fastest way to accomplish what we needed was to use TMS for relating videos to objects but use custom software for the formatting and uploading of the videos. We generate four versions of every video file &#8212; subtitled and not subtitled at two resolutions each &#8212; which we use in the galleries, on the tables and on the website. One of the weaknesses of this pipeline is that because the videos don&#8217;t live in the usual asset repository the way all of our images do, the link between TMS and the actual file&#8217;s location is made by nothing more than a &#8220;magic string&#8221; and a bit of guesswork. This makes it difficult to work with the video records in TMS: users get no preview and it can be difficult to know which video ID refers to which specific video. All of this is something we&#8217;ll be taking another look at in the near future, but there is one small chunk of this problem we approached in advance of the Triennial: how to make our website show the video in place of the primary image if it would be more appropriate to do so.
Here&#8217;s an example. [Daniel Brown&#8217;s On Growth and Form][12] is an animation on display in the Triennial. Before, it would have looked like this &#8212; the primary image is a still rendering that has been added in TMS, and the video appears as related content further down the page.

<img class="aligncenter size-medium wp-image-2497" src="/img/uploads/2016/03/growthandform-800x1685.jpg" alt="growthandform" srcset="/img/uploads/2016/03/growthandform-800x1685.jpg 800w, /img/uploads/2016/03/growthandform-768x1618.jpg 768w, /img/uploads/2016/03/growthandform-486x1024.jpg 486w, /img/uploads/2016/03/growthandform.jpg 1008w" sizes="(max-width: 800px) 100vw, 800px" />

What we did is to say if the object is itself a video, animation or other screen-based media and we have an associated video record linked to the object, remove the primary image and put the video there instead. That looks like this:

<img class="aligncenter size-large wp-image-2444" src="/img/uploads/2016/03/Screen-Shot-2016-02-16-at-3.33.50-PM-1024x930.png" alt="Screen Shot 2016-02-16 at 3.33.50 PM" />

Like all good iterations, this one opened up a bunch of next steps. First, we need to figure out how to add videos into our main digital asset pipeline so that the guesswork can be removed from picking primary videos and a curator or image specialist can select it as &#8220;primary&#8221; the same way they would do with an image. Next, it brought up an item that&#8217;s been on the backburner for a while, which is a better way to display alternate images of an object. Currently, they have their [own page][13], which gets the job done, but it would be nice to present some alternate views on the main object page as well.

<img class="size-full wp-image-2449" src="/img/uploads/2016/03/Screen-Shot-2016-02-18-at-12.07.22-PM.png" alt="It's fun!" />

## Just a Reflektor Sandbox

We had a great opportunity to do some experimentation on our collections site due to the inclusion of Aaron Koblin and Vincent Morisset&#8217;s interactive video for Arcade Fire&#8217;s [Just a Reflektor][14]. The project&#8217;s source code is [already available][15] online and contains a &#8220;sandbox&#8221; environment, a tool that demonstrates some of the interactive visual effects created for the music video in a fun, open-ended environment. We were able to quickly adapt the sandbox&#8217;s source code to fit on our collections site so that visitors who collect the video with their Pen will be able to explore a more barebones version of the final interactive piece. You can check that out [here][14].
## Fully Loaded Labels
When we were working on the Pen prototypes, we tried six different NFC tags before getting to the one that met all of our requirements. We ended up with [these NTAG203][16] tags whose combination of size and antenna design made them work well with our Pens and our wall labels. Their onboard memory of 144 bytes, combined with the system we devised for encoding collection data on them, meant that we could store a maximum of 11 objects on a tag. Of course we didn&#8217;t see that ever being a problem&#8230; until it was. The labels in the triennial exhibition are grouped by designer, not by object, and [in some cases][17] we have 35 objects from a designer on display that all need to be collected with one Pen press. There were two solutions: find tags with more memory (aka &#8220;throw more hardware at it&#8221;) or figure out a new way to encode the tags using fewer bytes and update the codebase to support both the new and old ways (aka &#8220;maintenance nightmare&#8221;). Fortunately for us, the NTAG216 series of tags have become more commonly available in the past year, which feature 888 bytes of memory, enough for around 70 objects on a tag. After a few rounds of end-to-end testing (writing the tag, collecting it with a pen and having it show up on the post-visit website), we rolled the new tags out to the galleries for the dozen or so &#8220;high capacity&#8221; labels.

<img class="size-large wp-image-2448" src="/img/uploads/2016/03/IMG_20160218_115542-1024x641.jpg" alt="The new tag (smaller, on the left) and the old tag (right)" />

The new tag (smaller, on the left) and the old tag (right)

The most interesting iteration that&#8217;s been made overall, I think, is how our exhibition workflow has changed over time to accommodate the Pen. With each new exhibition, we take what sneaked up on us the last time and try to anticipate it. As the most recent exhibition, Beauty&#8217;s timeline included more digitally-focused milestones from the outset than any other exhibition yet. Not only did this allow us to anticipate the tag capacity issue many months in advance, but it also gave us more time to double check and fix small problems in the days before opening and gave us more time to try new, experimental approaches to the collections website and post-visit experience. We&#8217;re all excited to keep this momentum going as work ramps up on the next exhibitions!


 [1]: http://labs.cooperhewitt.org/2016/on-exhibitions-and-iterations/
 [2]: https://collection.cooperhewitt.org/exhibitions/68744913/
 [3]: https://collection.cooperhewitt.org/exhibitions/51668975/
 [4]: https://labs.cooperhewitt.org/2015/object-phone-talking-cross-platform-content-in-museums/
 [5]: https://labs.cooperhewitt.org/2013/object-phone/
 [6]: https://collection.cooperhewitt.org/exhibitions/69155413
 [7]: http://mw2015.museumsandtheweb.com/paper/strategies-against-architecture-interactive-media-and-transformative-technology-at-cooper-hewitt/
 [8]: https://labs.cooperhewitt.org/2015/collect-all-the-things/
 [9]: https://labs.cooperhewitt.org/2015/how-re-opening-the-museum-enhanced-our-online-collection-new-views-new-api-methods/
 [10]: https://collection.cooperhewitt.org/exhibitions/69155413/text/
 [11]: https://labs.cooperhewitt.org/2014/sharing-our-videos-forever/
 [12]: https://collection.cooperhewitt.org/objects/69155099
 [13]: https://collection.cooperhewitt.org/objects/69155099/images/
 [14]: https://collection.cooperhewitt.org/objects/69155125
 [15]: https://github.com/unit9/justareflektor
 [16]: http://rapidnfc.com/item/59/white_nfc_tags_ntag203_round_38mm
 [17]: https://collection.cooperhewitt.org/people/69192327/objects/
