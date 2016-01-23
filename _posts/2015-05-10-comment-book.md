---
layout: post
title: Turn Your Repository's Comments into a Book with comment-book.py
date: 2015-05-10 05:32:02.000000000 -05:00
categories: []
tags:
- Python
- Regex
status: publish
type: post
published: true
---

![Parallel TMS, The Good Parts](/assets/commentbook.jpg)

When I started at [Cooper Hewitt Labs](http://labs.cooperhewitt.org), [Aaron](http://aaronland.info) joked that a good way for me to familiarize myself with the code would be to read the comments. We have a lot of comments in the code that powers the Cooper Hewitt’s [collections website](https://collection.cooperhewitt.org) and [API](https://collection.cooperhewitt.org/api) and they tell the story that the code cannot, like reasons why we did something this way and not that way, justification for ugly hacks, and many, many WTFs.

For Aaron’s farewell gift, I made him the book he always wanted: Parallel TMS, The Good Parts (featuring the beloved [Design Eagle](https://collection.cooperhewitt.org/objects/18448707/) on the cover). To generate the book, I wrote a python script that traversed our code and used regexes to extract comments. Those comments and the name of the files they came from were dumped into a Markdown file. Next, I used [pandoc](https://github.com/jgm/pandoc) to convert the Markdown to icml, a format understood by InDesign. Finally, I used InDesign to layout and style the book. From InDesign, I printed out the book (all 248 pages of it!) on letter paper and had it spiral bound at our local printshop.

I’ve made the code available on [Github](https://github.com/sambrenner/comment-book) if you’d like to make a comment book for yourself.
					
