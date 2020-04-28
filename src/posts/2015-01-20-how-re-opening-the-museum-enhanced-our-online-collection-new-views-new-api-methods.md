---
title: 'How re-opening the museum enhanced our online collection: New views, new API methods'
author: sambrenner
type: post
date: 2015-01-20T12:36:40+00:00
path: /notes/how-re-opening-the-museum-enhanced-our-online-collection-new-views-new-api-methods/
dsq_thread_id:
  - "3440084012"
categories:
  - Backends
  - CH 3.0
  - Collection data
  - Cooper Hewitt
tags:
  - Cooper Hewitt
churl: http://labs.cooperhewitt.org/2015/how-re-opening-the-museum-enhanced-our-online-collection-new-views-new-api-methods/
---


At the backend of our museum’s new interactive experiences [lies our API][2], which is responsible for providing the frontend with all the data necessary to flesh out the experience. From everyday information like an object’s title to more novel features such as tags, videos and people relationships, the API gathers and organizes everything that you see on our digital tables before it gets displayed.

In order to meet the needs of the experiences designed for us by [Local Projects][3] on our interactive tables, we added a lot of new data to the API. Some of it was sitting there and we just had to go find it, other aspects we had to generate anew.

Either way, this marks a huge step towards a more complete and meaningful representation of our collection on the internet.

Today, we’re happy to announce that all of this newly-gathered data is live on our website and is also publicly available over the API (head to the [API methods documentation][4] to see more about that if you&#8217;re interested in playing with it programmatically).

## People

For the [Hewitt Sisters Collect][5] exhibition, Local Projects designed a front-end experience for the multitouch tables that highlights the early donors to the museum&#8217;s collection and how they were connected to each other. Our in-house &#8220;TMS liaison&#8221;, Sara Rubinow, worked to gather and structure this information before adding it to TMS, our collection management system, as &#8220;constituent associations&#8221;. From there I extracted the structured data to add to our website.

We created a the following new views on the web frontend to house this data:
  * [All relationships][6]
  * Instances of a type of relationship (e.g. &#8220;[parent-child][7]&#8220;)
  * People related to a single person (e.g. [Sarah Cooper Hewitt][8])

We also added a few new biography-related fields: portraits or photographs of _Hewitt Sisters_ people and two new biographies, one 75 words and the other 50 characters. These changes are viewable on applicable people pages (e.g. [Eleanor Garnier Hewitt][9]) and the [search results page][10].

The overall effect of this is to make more use of this &#8216;people-related&#8217; data, and to encourage the further expansion of it over time. We can already imagine a future where other interfaces examining and revealing the network of relationships behind the people in our collection are easily explored.

## Object Locations and Things On Display

Some of the more difficult tasks in updating our backend to meet the new requirements related to dealing with objects no longer being static &#8211; but moving on and off display. As far as the website was concerned, it was a luxury in our three years of renovation that objects weren&#8217;t moving around a whole lot because it meant we didn&#8217;t have to prioritize the writing of code to handle their movement.

But now that we are open we need to better distinguish those objects in storage from those that are on display. More importantly, if it is on display, we also need to say which exhibition, and which room it is on display.

Object locations have a lot of moving parts in TMS, and I won&#8217;t get into the specifics here. In brief, object movements from location to location are stored chronologically in a database. The &#8220;movement&#8221; is its own row that references where it moved and why it moved there. By appropriately querying this history we can say what objects have ever been in the galleries (like all museums there are a large portion of objects that have never been part of an exhibition) and what objects are there right now.

We created the following views to house this information:
  * [Objects on display][11]
  * [People whose objects are on display][12]
  * [All locations][13]
  * [Objects to have ever been in a location][14]
  * [Objects currently in a location][15]

## Exhibitions

The additions we&#8217;ve made to exhibitions are:
  * [Separate current exhibitions from past ones][16]
  * [Add &#8220;wall text&#8221; to the website][17]
  * [Add associated videos to exhibitions][18]
  * [Group objects by which section of an exhibition they were in][19]

There is still some work to be done with exhibitions. This includes figuring out a way to handle object rotations (the process of swapping out some objects mid-exhibition) and outgoing loans (the process of lending objects to other institutions for their exhibitions). We&#8217;re expecting that objects on loan should say where they are, and in which external exhibition they are part of &#8212; creating a valuable public &#8216;trail&#8217; of where an object has traveled over its life.

## Tags

Over the summer, we began an ongoing effort to &#8216;tag&#8217; all the objects that would appear on the multitouch tables. This includes everything on display, plus about 3,000 objects related to those. The express purpose for tags was to provide a simple, curated browsing experience on the interactive tables &#8211; loosely based around themes &#8216;user&#8217; and &#8216;motif&#8217;. Importantly these are not unstructured, and Sara Rubinow did a great job normalizing them where possible, but there haven&#8217;t been enough exhibitions, yet, to release a public thesaurus of tags.

We also added [tags to the physical object labels][20] to help visitors draw their own connections between our objects as they scan the exhibitions.

On the website, we&#8217;ve added tags in a few places:

* [All tags][21]
* [Objects for a tag][22]
* [Tags for an object][23]
* We also added an object&#8217;s tags to its search record to improve relevant search results.

That&#8217;s it for now &#8211; happy exploring! I&#8217;ll follow up with more new features once we&#8217;re able to make the associated data public.
Until then, our complete list of API methods is available [here][4].

 [1]: http://labs.cooperhewitt.org/2015/how-re-opening-the-museum-enhanced-our-online-collection-new-views-new-api-methods/
 [2]: https://labs.cooperhewitt.org/2014/the-api-at-the-center-of-the-museum/
 [3]: http://localprojects.net/
 [4]: https://collection.cooperhewitt.org/api/methods
 [5]: http://www.cooperhewitt.org/events/opening-exhibitions/hewitt-sisters-collect/
 [6]: https://collection.cooperhewitt.org/relationships
 [7]: https://collection.cooperhewitt.org/relationships/68732893/
 [8]: https://collection.cooperhewitt.org/people/18049321/relationships/
 [9]: https://collection.cooperhewitt.org/people/18049325/
 [10]: https://collection.cooperhewitt.org/search/collection/?query=john+pierpont+morgan
 [11]: https://collection.cooperhewitt.org/objects/ondisplay
 [12]: https://collection.cooperhewitt.org/people/ondisplay
 [13]: https://collection.cooperhewitt.org/locations/
 [14]: https://collection.cooperhewitt.org/locations/rooms/68527317/objects/
 [15]: https://collection.cooperhewitt.org/locations/rooms/68527317/objects/current
 [16]: https://collection.cooperhewitt.org/exhibitions/
 [17]: https://collection.cooperhewitt.org/exhibitions/51668987/text/
 [18]: https://collection.cooperhewitt.org/exhibitions/51668983/videos/
 [19]: https://collection.cooperhewitt.org/exhibitions/51668987/section/68859739/
 [20]: https://twitter.com/BArmintor/status/551115081803907072
 [21]: https://collection.cooperhewitt.org/tags/
 [22]: https://collection.cooperhewitt.org/tags/geometric/
 [23]: https://collection.cooperhewitt.org/objects/18733657/
