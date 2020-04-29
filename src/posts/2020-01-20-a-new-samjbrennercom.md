---
title: A new samjbrenner.com
type: post
date: 2020-04-27T22:32:15-05:00
path: /notes/a-new-samjbrenner-com
categories:
  - Housekeeping
---

Except for a quick touch-ups when I've been on the job hunt, I've let this website go quite unloved over the last four years. I've sat down a few times to try and rebuild it, mainly with the goal of migrating off of Wordpress, but was never able to keep the momentum up. After a stalled attempt with [Jekyll](https://jekyllrb.com/), I've finally found that momentum with [Gatsby](https://www.gatsbyjs.org/), and am now very excited to roll out my technically different, visually almost identical new website.

There are two reasons I've been motivated to rebuild the site: first, I'm not actively writing PHP or working with Wordpress for my day job, so maintaining a local development environment for the site has been a pain. Further complicating this, the [Notes](/notes) section of the old site was a standard Wordpress install, but other sections like the [Portfolio](/) and [About](/about) pages were built off a custom, lightweight framework I wrote. As a result of this Franken-architecture's monster, whenever I needed to make an update that wasn't possible through the Wordpress CMS, I would end up working straight off the FTP server, rooting around Filezilla for template files and editing them live.

The second reason is security. My host does automatically upgrade Wordpress versions for me as updates are released, but those have failed from time to time, leaving me with DB connection errors and a broken homepage. I'd rather have the peace of mind that comes with a static site, where all development takes place locally and no application needs to be run remotely.

I was happy with the layout of the old site, so visually things haven't changed a whole lot. Most notably, I changed the typeface from [Signika](https://fonts.google.com/specimen/Signika) to [Public Sans](https://github.com/uswds/public-sans). On my old site, I overrode the default space bar functionality to control my boat game, which desktop visitors can see in the top left corner of the site. I removed that override for accessibility reasons, so now hitting space will scroll you down the page as expected. You can still click on the boat to make it jump, and I've also added in an auto-jump every 10 seconds.

As for the content of the blog—you will notice that this is the first post I've written since 2016, but that's not for lack of trying! I have more than a few draft posts that ultimately went nowhere thanks to my tendency to prematurely copyedit and not just let the words flow. With the new decade, I hope to put that behind me and write about some of the work I did at [Vidcode](https://vidcode.com), put down some thoughts on Flash, and reflect on my time teaching at [Parsons](https://newschool.edu/parsons).
