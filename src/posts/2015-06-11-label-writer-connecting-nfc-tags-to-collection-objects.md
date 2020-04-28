---
title: 'Label Writer: connecting NFC tags to collection objects'
author: sambrenner
type: post
date: 2015-06-11T15:08:38+00:00
path: /notes/label-writer-connecting-nfc-tags-to-collection-objects/
categories:
  - Cooper Hewitt
  - Interaction Design
  - Tablets
  - UX
tags:
  - Cooper Hewitt
churl: http://labs.cooperhewitt.org/2015/label-writer-connecting-nfc-tags-to-collection-objects/
---

<img class="aligncenter size-large wp-image-2272" src="/img/uploads/2016/03/IMG_20150610_113555-1024x758.jpg" alt="IMG_20150610_113555" />

Labels, [for better or worse][2], are central to the museum experience. They provide visitors with access to basic object information (metadata) and a tiny glimpse into the curatorial research for everything in the galleries, helping to place objects in context. At Cooper Hewitt, they are also the gateway through which the [Pen][3]&#8216;s &#8220;collect&#8221; interaction is realized.

In order for the Pen to know which object label you&#8217;re trying to collect, every label in the museum contains an [NFC][4] tag that is written with the object&#8217;s ID. When an object gets added to our database we give it an ID, an [integer][5] that is unique across our entire online collections database. Our beloved [Spanking Cat][6], for example, has the ID number 18382391. Writing that number to an NFC tag is a simple task, but doing it hundreds of times for every new exhibition we roll out will get tedious very quickly. Thus, _Label Writer_ was born.

_Label Writer_ is an Android app that writes, reads and locks NFC tags based on the object to which the label refers. The staff member can look up the objects that are in a given room of our museum, select one or more of them, and assign them to the label in question. They can search for specific objects in case an object&#8217;s location hasn&#8217;t been updated yet. They can also write tags for videos and shop items.

<img class="size-large wp-image-2275" src="/img/uploads/2016/03/IMG_20150610_125817-1024x758.jpg" alt="The front and back of the NFC tag we use in our labels, with pennies for scale" />

From left to right: the back and front of the NFC tags we use in our labels, and pennies for scale.

## Planning

After thinking about the app we came up with the following requirements:
  1. When processing a user&#8217;s visit, we need to know what type of thing they&#8217;ve collected. When the Pen launched, this was either objects or videos, and has since grown to [include shop items][7]. To facilitate that process, Label Writer would have to distinguish between types of things and write tags that indicated that.
  2. It would need to write multiple things to a tag, including things of different types. One label might contain three objects. Another label might contain one video and two objects.
  3. It would need to lock tags. Leaving the tags unlocked would enable anyone with an NFC-enabled smartphone to walk around the galleries and overwrite our tags. Locking the tags prevents this.
  4. It would need to read tags and display images of what&#8217;s on a tag. This is so we can double-check what is on a tag before we lock it. We only print one copy of every label &#8211; sometimes through an offsite service &#8211; and the wall labels (as opposed to the rail labels) have their NFC tags glued in and unable to be replaced.
  5. Label Writer would have to present objects in a constrained format &#8212; having to find the object on a label from our total collection of 210,000 objects every time, through accession number lookup or other traditional searches, would get annoying very quickly.

<img class="wp-image-2271 size-large" src="/img/uploads/2016/03/IMG_20150608_172543-1024x768.jpg" alt="IMG_20150608_172543" />

The NFC tags on our wall labels are built in to the label.

<img class="wp-image-2270 size-large" src="/img/uploads/2016/03/IMG_20150608_172442-1024x768.jpg" alt="IMG_20150608_172442" />

The NFC tags on our rail labels are interchangeable.

## Production

I decided to build the app in Android because it has [great support for NFC][8] and we have plenty of Nexus 9 tablets at the museum for use in the galleries. I started with [this boilerplate][9] for an Android read/write NFC app and performed initial tests to make sure we could write a tag that could be read by some of the early Pen prototypes. Once that was established, I began fleshing out the UI of the app and worked on hooking it up to our API.

[The API][10] gives us [so much][11] to work with on the app&#8217;s frontend. Being able to display an object&#8217;s image is a much better way to confirm that a label is written correctly than by comparing IDs or accession numbers. The API also lets us see all of the objects in a given room of the museum, which means that the user can write labels in an ordered fashion. When the labels arrive from the printer they are grouped by room, and often we will not write the tags until they have been installed in the galleries, so &#8220;by room&#8221; is a convenient way to organize objects on the frontend. It also gives us easy access to videos and shop items, and allows the app to easily be expanded to write labels for more things from our collections database. [Since our collections site alpha][12], we have stressed the importance of an easily-accessed permanent ID for everything: people, objects, videos, exhibitions, locations etc., and now with the Pen we can prepare labels that allow users to collect any one of those things during their visit to the museum.

<img class="wp-image-2263 size-full" src="/img/uploads/2016/03/01.jpg" alt="01" />

When I took all these screenshots, the app was called &#8220;Tag Writer&#8221;, as in &#8220;NFC Tag Writer.&#8221; But &#8220;Label Writer&#8221; sounds better.

When the app is opened, the user is prompted with a few ways to group objects. Since we added videos and shop items to the app, this intro screen has grown a bit so it will probably get a redesign when we next expand its capabilities. But for now, users have a few options here:

  1. They can select a room from a dropdown menu (here&#8217;s a list of [all of our rooms][13])
  2. They can enter an individual accession number
  3. They can enter a video&#8217;s ID
  4. They can search the shop (see [Aaron&#8217;s recent post][7] about adding shop items to our online collection)

When one of these options is used, the relevant objects appear on the screen. For example, selecting Room 106 brings up some of the posters from our current [How Posters Work][14] exhibition. Being able to display the images of the posters makes it much easier for the user to confirm that they are connecting the dots accurately &#8212; accession numbers and object IDs are easily confused (not to mention boring to look at).

<img class="aligncenter size-full wp-image-2264" src="/img/uploads/2016/03/02.jpg" alt="02" />

The user can then tap one or more objects to add them to a label. In the screenshot below, you can see that two objects have been selected and the orange bar at the bottom has formatted them to be written to a tag &#8212; in this case, <code class="codecolorer text default">&lt;span class="text">chsdm:o:68730187;18708395&lt;/span></code>. The way that things get written to tags follows a format we agreed upon early in the Pen design process, as various developers would be building applications that relied on reading and parsing a Pen&#8217;s content. In brief, <code class="codecolorer text default">&lt;span class="text">chsdm&lt;/span></code> is a namespace for our museum that is not particularly necessary but serves as a header for what follows. o stands for object and then the ID (or semicolon-delimited IDs) that follow are the IDs of objects. The letter can change: v for video, s for shop, and on and on for whatever other things we might eventually write to tags. We add a pipe character (|) to delimit multiple types of things on a tag, so a tag with an object and a video might look like <code class="codecolorer text default">&lt;span class="text">chsdm:o:18714653|chsdm:v:68764195&lt;/span></code>. But all of this is handled by the app based on what the user selects in the interface.

<img class="aligncenter size-full wp-image-2265" src="/img/uploads/2016/03/03.jpg" alt="03" />

Next, a user can hold the tablet up to the object label to write the NFC tag. When the tag is written, the orange bar at the bottom turns green to let the user know it went okay. Later, using the &#8220;Read Tags&#8221; functionality of the app, the user can confirm the tag&#8217;s contents by reading the NFC tag. The app parses the tag and loads the things it thinks the tag refers to. When this is confirmed, the user can lock the tag to make sure nobody overwrites it.

<img class="aligncenter size-full wp-image-2267" src="/img/uploads/2016/03/05.jpg" alt="05" />

Here&#8217;s everything, from start to finish, using the object-lookup-by-accession-number functionality.

## Next Steps

I mentioned that the home screen of this app will get a redesign as we allow more types of things to be written to tags. The user experience of the tag writing process needs a little finessing &#8212; a bug in how success messages get displayed has resulted in a few tags that get written with bunk data. Fortunately that is caught in the &#8220;read&#8221; phase of the workflow, but should be corrected earlier.

Overall, as we keep swapping out exhibitions, Label Writer will get more and more use. We will use these opportunities to collect feedback from the app&#8217;s users and make changes to the app accordingly.

 [1]: http://labs.cooperhewitt.org/2015/label-writer-connecting-nfc-tags-to-collection-objects/
 [2]: http://www.nytimes.com/2015/03/19/arts/artsspecial/labels-digital-included-assume-new-importance-at-museums.html?_r=0
 [3]: http://www.cooperhewitt.org/new-experience/designing-pen/
 [4]: https://en.wikipedia.org/wiki/Near_field_communication
 [5]: http://brooklynintegers.com/
 [6]: https://collection.cooperhewitt.org/objects/18382391/
 [7]: https://labs.cooperhewitt.org/2015/object-concordances/
 [8]: https://developer.android.com/guide/topics/connectivity/nfc/index.html
 [9]: https://github.com/skjolber/Fagmote/tree/master/Android/Near%20Field%20Communications
 [10]: https://labs.cooperhewitt.org/2014/the-api-at-the-center-of-the-museum/
 [11]: https://labs.cooperhewitt.org/2015/how-re-opening-the-museum-enhanced-our-online-collection-new-views-new-api-methods/
 [12]: https://labs.cooperhewitt.org/2012/lost-collection-alpha/
 [13]: https://collection.cooperhewitt.org/locations/rooms/
 [14]: https://collection.cooperhewitt.org/exhibitions/68744915/
