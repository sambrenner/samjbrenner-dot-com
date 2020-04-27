---
title: Visual consistency: tweaking the online collection
author: sambrenner
type: post
date: 2015-08-18T20:39:57+00:00
path: /notes/visual-consistency-tweaking-the-online-collection/
categories:
  - CH 3.0
  - Collection data
  - Cooper Hewitt
  - Interaction Design
tags:
  - Cooper Hewitt
  - metadata
  - online collection
  - tms
---
_This post was originally published on the [Cooper Hewitt Labs blog][1]._
The [alpha version][2] of our site launched in 2012 and in the following three years it has grown very quickly. New data was imported, new pages were made, new API methods went public, whole new suites of functionality were added and it was even redesigned (twice).
As a result of this period of rapid growth and change, things got a little messy. The object page had become a dumping ground for metadata. We had a 1200-line global CSS file and two different versions of Bootstrap that for some reason needed each other to work. We had at least three different ways of displaying a &#8220;list of things.&#8221;
At the same time, we&#8217;re not done growing. In many ways we&#8217;re still in beta.
We want to expand the post-visit experience, integrate software tests, conduct structured user tests and more. But that work was getting harder to think about with such a sprawling codebase and inconsistent visual hierarchy in place. With that in mind, we recently embarked on a three-week work sprint to review our site&#8217;s layout and codebase. The result is a consistent visual hierarchy, easily enforced and editable in the code, that sets our site up to easily accomplish all the future plans we have.
We began this work, internally dubbed &#8220;visual consistency&#8221;, with the simple exercise of pinning up printouts of some of the pages of our site. With everything presented together, it was easy to see some of the inconsistencies of the layout.
[<img class="aligncenter size-large wp-image-2318" src="/img/uploads/2016/03/IMG_20150715_172730-1024x758.jpg" alt="IMG_20150715_172730" />][3]
The bird&#8217;s-eye view of the site highlighted a few specific layout problems. A clear one, for example, were our three different ways of showing lists:
[<img class="wp-image-2322 size-large" src="/img/uploads/2016/03/lists1-1024x208.jpg" alt="Lists three ways. Click to enlarge." />][4] Lists three ways. Click to enlarge.
Another issue we saw with the layout was the awkward positioning of contextual information. The inherent tension in making collections like ours available online is that there are two equally interesting stories to be told: the story of the object itself, and the story about how those objects have (or haven&#8217;t) been cataloged, organized, and tended to during the life of our institution. We believe one of the main functions of our collections site is to explore this tension by presenting traditional and experimental ways of organizing and traversing the data, and to simultaneously describe what, why, and how we are doing it. Often, this takes the form of descriptive text which frames the page&#8217;s contents in a certain narrative. In our current site, however, that descriptive text was crowding out the rest of the content.
Our &#8220;colors&#8221; page is a good example of this. This is what it looked like two years ago on the alpha version of the site:
[<img class="aligncenter size-large wp-image-2320" src="/img/uploads/2016/03/Screen-Shot-2013-02-13-at-10.14.52-AM-copy-1024x896.png" alt="Screen Shot 2013-02-13 at 10.14.52 AM copy" />][5]
Here, a short description of this experimental feature gives context for the main content of the page, a dissection of our collection by colors in its photograph. Jump to one year ago, after the [beta launch][6] of the site (which focused on responsive layouts and presentation of images) and the subsequent application of our new brand, when the page looked like this:
[<img class="aligncenter size-large wp-image-2321" src="/img/uploads/2016/03/colors-before-1024x645.png" alt="colors-before" />][7]
Not only had we added more text in the description of a new feature (color palettes), but the combination of a larger font size and tighter main column had resulted in the main content of the page being pushed down. I hesitate to say that it&#8217;s been pushed &#8220;below the fold,&#8221; because the fold is a myth! But [as Sophie Shepherd writes for Happy Cog][8], to forget the fold is &#8220;not to say that we shouldn’t think about the hierarchy of the content on a page.&#8221;
The actual color information is the most important thing on the page, but then the only other place we would have to put description and context is at the bottom. Other pages, such as the exhibition page, had also seen an increase in descriptive text which resulted in a difficult-to-read &#8220;wall of text.&#8221; This got us thinking about a middle ground that would allow us to appropriately place the colors, images or other &#8220;main content&#8221; of a page atop the visual hierarchy without relegating the context.
Another major inconsistency that stood out was the placement or implementation of navigational or other web-specific tools such as pagination, total counts and filters. It&#8217;s tied to the previous issue in that we were just adding various filtering tools to the top of every page, blended in with longer descriptive text that pushed the main content further and further down. We also identified the many ways we go about allowing pages to be filtered, and decided that while a consistent filtering system would be out of the scope of this sprint, it was something to keep in mind as we reconsidered the hierarchy of our current pages.
[<img class="size-large wp-image-2329" src="/img/uploads/2016/03/filters-1024x343.jpg" alt="Two ways we handled filters: on the left, an accordion menu that produces a number of dropdowns. On the right, inline dropdowns to toggle sort options." />][9] Two ways we handled filters: on the left, a &#8220;Filter these results&#8221; links expands accordion menu that produces a number of dropdowns. On the right, the subtitle text contains inline dropdowns to toggle sort options.
[Ayham][10], our summer intern, started experimenting with new layouts based on our discussions. He came up with a flexible two-column system which allows a pages main content to show up much higher on the page and gives the contextual content and filtering tools a home of their own off to the side. He experimented with various ways to organize narrative, context and navigational elements in a way which would work across multiply types of webpage. The workflow was based on quick mock-ups and frequent conversations among the Labs, and once the broader layout changes were implemented in code, we abandoned Illustrator comps for edits directly in the CSS so we could address issues like mobile viewports and spacing tweaks.
[<img class="wp-image-2324 size-large" src="/img/uploads/2016/03/comps-1024x384.jpg" alt="comps" />][11] Early comps for &#8220;visual consistency&#8221;
Here&#8217;s the result of that work, in this instance, the Colors page with the new template applied. Colors are moved much further up the page, and the contextual information remains present without dominating the main content.
[<img class="aligncenter size-large wp-image-2325" src="/img/uploads/2016/03/colors-after-994x1024.png" alt="colors-after" />][12]
Here are a couple more before / after comparisons, in GIF form.
[<img class="aligncenter size-full wp-image-2327" src="/img/uploads/2016/03/exhib-ba.gif" alt="exhib-ba" />][13] [<img class="aligncenter size-full wp-image-2328" src="/img/uploads/2016/03/exhib-ba-list.gif" alt="exhib-ba-list" />][14]
To support all of these design changes, the styling and templating saw some changes as well. The 1200-line CSS file was obliterated &#8211; about 800 of those lines referred to things that were gone from the site or overridden elsewhere. Other CSS rules were split off in to individual files based on section of the site (object.css, visit.css etc) and the templates were updated to load in their individual &#8220;specific CSS files&#8221; as needed. I created a &#8220;master template&#8221; that would render all pages instead of having each template be responsible for including its own header, footer and column structure. I built the template to handle three main components: an image grid, an aside, and &#8220;everything else.&#8221; If any one of those three elements is missing from a page, the template will adapt, which allows us to keep a consistent organizational system across webpages that serve different purposes. Implementing this involved the tedious task of reformatting about 90 template files to use a master template but would be worth the effort: in addition to facilitating a consistent visual hierarchy, the master template will allow us to quickly make future site-wide layout changes, which can aid in user testing.
This is daunting work because it requires things to be torn apart and built back up, which takes longer than the two or three days we normally give ourselves to finish tasks. It forced us to consider mundane things that had previously gone undiscussed like ordering of metadata and typographic best practices &#8211; which would have held the necessarily rapid development of the site back. But the work was beneficial for reasons beyond &#8220;visual consistency&#8221;: it gave us a change to reflect on how the site had evolved, it helped us identify areas most in need of future attention, and going forward it gives us more room to grow.

 [1]: http://labs.cooperhewitt.org/2015/visual-consistency-tweaking-the-online-collection/
 [2]: https://labs.cooperhewitt.org/2012/online-collection-alpha/
 [3]: /img/uploads/2016/03/IMG_20150715_172730.jpg
 [4]: /img/uploads/2016/03/lists1.jpg
 [5]: /img/uploads/2016/03/Screen-Shot-2013-02-13-at-10.14.52-AM-copy.png
 [6]: https://labs.cooperhewitt.org/2013/b-is-for-beta/
 [7]: /img/uploads/2016/03/colors-before.png
 [8]: http://cognition.happycog.com/article/behold-the-fold
 [9]: /img/uploads/2016/03/filters.jpg
 [10]: http://ayhamghraowi.com/
 [11]: /img/uploads/2016/03/comps.jpg
 [12]: /img/uploads/2016/03/colors-after.png
 [13]: /img/uploads/2016/03/exhib-ba.gif
 [14]: /img/uploads/2016/03/exhib-ba-list.gif
