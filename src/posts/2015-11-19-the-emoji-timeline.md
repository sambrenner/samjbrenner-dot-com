---
title: The emoji timeline
author: sambrenner
type: post
date: 2015-11-19T21:45:14+00:00
path: /notes/the-emoji-timeline/
categories:
  - Collection data
  - Cooper Hewitt
  - Interaction Design
churl: http://labs.cooperhewitt.org/2015/the-emoji-timeline/
---

We made an emoji timeline. You can see it on [any object page][2] &#8212; it looks like this:

[<img class="aligncenter size-full wp-image-2409" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.44.57-PM.png" alt="Screen Shot 2015-11-19 at 3.44.57 PM" />][3]

I want to frame the work we did on the timeline around web accessibility. Web accessibility &#8212; the idea that something should be fully-usable for all users regardless of disability status &#8212; is something we need to place as a higher priority on our websites. We do things like subtitling all of our videos and [releasing the .srt file over our API][4] and employing [progressive enhancement][5] to ensure that no content is withheld from visitors using older / alternative web browsers. But turning on [VoiceOver][6] and having my computer read an object page recently revealed some of the many opportunities to improve accessibility on the site.

A few months ago, we started talking about updating our [previous timeline][7] to integrate it with the [new object page layout][8] we&#8217;d recently completed. I opened up NYPL&#8217;s [Digital Collections][9] because I really like their timeline (it&#8217;s at the bottom of the page) and wanted to use it as a conversation-starter for how we could improve ours.

We quickly realized the accessibility concerns that something like this poses. The two main concerns were first that a purely-Javascript solution, as we had before, could be troublesome for someone using a [screen reader][10], so it would need to have a &#8220;non-JS&#8221; version. The second was that a timeline that relies on color to differentiate events could be troublesome for a colorblind person, so we would need to provide a legend.

The first issue would be easy enough to solve. We would add the timeline&#8217;s contents to the markup (HTML) first and then add any extra functionality on top of it.

The thought process for the second issue (use of color) went like this:

> Color will be useless so we will have to use shapes as well. But then we&#8217;ll need a legend because color or shape don&#8217;t have anything to do with timeline events like &#8220;date created&#8221; or &#8220;date exhibited.&#8221; But legends are a bummer &#8212; so old media! Maybe we could use symbols instead? Maybe we could use EMOJI?!?!?

Beyond the fact that their symbolic nature transcends the &#8220;map a color to an idea&#8221; style of legend, emojis further a second goal that we have with the collections site, which is to &#8220;avoid feeling like a database.&#8221; They allow for novelty, comfort and humor to be injected into the digital world as quickly as typing a letter on a keyboard. In fact, as I write this post, the Oxford English Dictionary announced that the crying face emoji is their [word of the year][11].

Thus, the emoji timeline was born. No legend required, compact in size and fun to look at!

The vast majority of objects have a timeline that looks like this:

[<img class="aligncenter size-large wp-image-2413" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.49.05-PM.png" alt="Screen Shot 2015-11-19 at 3.49.05 PM" />][12]

We acquired it in 1941 as a gift. We took a picture of it in 2015, and we&#8217;re happy that you found it now! (We borrowed the &#8220;found by you&#8221; idea from NYPL; it makes me feel so warm and fuzzy.)

There are some other ways that we acquire objects, and we use different emojis to signify them. We acquired [this object][13] by bequest, so it gets a scroll:

[<img class="aligncenter size-large wp-image-2411" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.48.37-PM.png" alt="Screen Shot 2015-11-19 at 3.48.37 PM" />][14]

[Some objects][15] are &#8220;found&#8221; in our collection; these get a magnifying glass:

[<img class="aligncenter size-full wp-image-2414" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.53.05-PM.png" alt="Screen Shot 2015-11-19 at 3.53.05 PM" />][16]

We purchased [this object][17], presumably with dollars:

[<img class="aligncenter size-full wp-image-2415" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.57.20-PM.png" alt="Screen Shot 2015-11-19 at 3.57.20 PM" />][18]

[Some objects][19] have more frantic timelines:

[<img class="aligncenter size-full wp-image-2416" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-4.16.47-PM.png" alt="Screen Shot 2015-11-19 at 4.16.47 PM" />][20]

The default, emoji-free experience looks like this:

[<img class="aligncenter size-full wp-image-2417" src="/img/uploads/2016/03/Screen-Shot-2015-11-19-at-12.11.47-PM.png" alt="Screen Shot 2015-11-19 at 12.11.47 PM" />][21]

You&#8217;ll notice a lot of cameras, too. This means that we photographed the object that year, and the icon serves as a link to take you straight to that picture &#8211; see [this sidewall][22] as an example. We actually just limit one photograph per year, because [some of our objects have a lot of photos][23] and the timeline started to look like this:

[<img class="aligncenter size-full wp-image-2419" src="/img/uploads/2016/03/Screen-Shot-2015-11-17-at-4.14.30-PM.png" alt="Screen Shot 2015-11-17 at 4.14.30 PM" />][24]

Exhibitions, symbolized by the [big eyeballs][25], are also clickable. They will take you to the exhibition page to see all the objects that your current object was displayed alongside.

I don&#8217;t mean to say we&#8217;ve solved accessibility issues through this timeline. As I mentioned before, a concerted look at our site&#8217;s accessibility issues will be an important next step for us.  But like our previous timeline, it&#8217;s more of an opportunity to experiment than anything else. In this case, we&#8217;re experimenting with ways to approach a project by talking about accessibility first. And of course, we&#8217;re experimenting with emoji. Always be experimenting with emoji.

Pull up a [random object][26] and check it out!


 [1]: http://labs.cooperhewitt.org/2015/the-emoji-timeline/
 [2]: https://collection.cooperhewitt.org/objects/18612297/
 [3]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.44.57-PM.png
 [4]: https://collection.cooperhewitt.org/api/methods/cooperhewitt.videos.getInfo
 [5]: https://en.wikipedia.org/wiki/Progressive_enhancement
 [6]: https://www.apple.com/accessibility/osx/voiceover/
 [7]: https://labs.cooperhewitt.org/2013/a-timeline-of-event-horizons/
 [8]: https://labs.cooperhewitt.org/2015/visual-consistency-tweaking-the-online-collection/
 [9]: http://digitalcollections.nypl.org/items/510d47da-4579-a3d9-e040-e00a18064a99?featured=true
 [10]: http://webaim.org/techniques/screenreader/
 [11]: http://blog.oxforddictionaries.com/2015/11/word-of-the-year-2015-emoji/
 [12]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.49.05-PM.png
 [13]: https://collection.cooperhewitt.org/objects/18342713/
 [14]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.48.37-PM.png
 [15]: https://collection.cooperhewitt.org/objects/18699101/
 [16]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.53.05-PM.png
 [17]: https://collection.cooperhewitt.org/objects/68250793/
 [18]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-3.57.20-PM.png
 [19]: https://collection.cooperhewitt.org/objects/18710419/
 [20]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-4.16.47-PM.png
 [21]: /img/uploads/2016/03/Screen-Shot-2015-11-19-at-12.11.47-PM.png
 [22]: https://collection.cooperhewitt.org/objects/18316419/
 [23]: https://collection.cooperhewitt.org/objects/18449359/
 [24]: /img/uploads/2016/03/Screen-Shot-2015-11-17-at-4.14.30-PM.png
 [25]: https://collection.cooperhewitt.org/objects/18730099/
 [26]: https://collection.cooperhewitt.org/objects/random
