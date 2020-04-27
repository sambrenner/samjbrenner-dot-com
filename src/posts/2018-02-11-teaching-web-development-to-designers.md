---
title: Teaching Web Development to Designers
author: sambrenner
type: post
date: -001-11-30T00:00:00+00:00
draft: true
path: /notes/?p=2622
categories:
  - Uncategorized
---
About a year and a half ago, I started teaching web development at Parson&#8217;s Communication Design program. It&#8217;s my first teaching job (save for a few workshops here and there), and in the three semesters since it has given me a new perspective on how and why we teach web development fundamentals to designers.
In retrospect, the idea of teaching HTML, CSS and JavaScript as a means towards understanding interactive design didn&#8217;t seem fully baked when I was a design undergrad in 2005. Perhaps the curriculum wasn&#8217;t in place, or the technical learning curve was too high (at the time, jQuery was but some [thoughts in a blog post][1]). Whatever the reason, we didn&#8217;t spend a great deal of time on those technologies, and what we did cover was more practical than anything else: pre-packaged implementations of dropdown menus, image rollover effects, and other practical drop-ins. Instead, the backbone of our studies on interaction was through Flash, the now perennially-dying browser plugin which was at one time ([according to Adobe][2]) installed on 99% of personal computers.
I imagine that choosing to teach interactive design through Flash made a lot of sense at the time, as many of its features had an analog that the school would have already produced curriculum for. Flash&#8217;s Illustrator-like vector graphics and typography tools allowed core graphic design principles to be applied. Its timeline allowed for teaching concepts from film and animation. And ActionScript, its built-in language, could be used to teach programming fundamentals. Each of these features could serve as a compelling entry point for newcomers with different backgrounds and skills. And as those students got more comfortable with each of these features, Flash made it easy for them to be combined into the &#8220;rich web experiences&#8221; that were being churned out (for big money) by digital ad agencies for most of that decade.
[For many reasons][3], Flash is now mostly gone from the web and certainly absent from any interactive design curricula I&#8217;ve seen. Its many uses have been replaced in part by various technologies like [Open Frameworks][4], [Cinder][5], [Processing][6] / [p5.js][7], and the aforementioned web standards: HTML, CSS, and JS. But whatever the technologies involved, the concepts that were taught to me (and that I hope to teach to my students) remain the same. Among them, to organize information visually and experientially; to observe, describe, and critique interactive applications; and of course to be able to build them for themselves.
Web standards, then and now, present an interesting way of presenting both the technical and theoretical aspects of interaction design to new students. Each of the three languages can be aligned to a core principle: HTML for the information, CSS for the appearance and JS for the behavior. They interact with each other in a way that, like Flash, builds on itself over time to allow for more complex applications.
For me, this interrelation is a compelling idea on which to base a web development curriculum for design students. By starting with only HTML &#8211; its browser-default styles, its content hierarchy, its hyperlinks &#8211; students are invited to consider screen-based design beyond form and style. CSS adds those familiar concerns (typesetting, shape, color) back in, and introduces a new way to consider layout with the box model. I frame all of these as &#8220;outputs,&#8221; or a way that a system can represent its state.
When I introduce JavaScript, students can then start just by recreating all of their &#8220;outputs&#8221;: make this red, make that spin, make these words appear, and so on. As their understanding and confidence with JS syntax grows, I slowly start introducing &#8220;inputs.&#8221; First, the time of day, then a constant &#8220;tick&#8221; created with <code class="codecolorer text default">&lt;span class="text">setInterval&lt;/span></code>, and eventually event listeners to handle user inputs like clicking, scrolling, and typing. As this complexity grows, we move from thinking about how our applications work to thinking about when and why our applications should work.
After having spoken to some of my colleagues at Parsons, though, it became apparent that aligning these concepts with a web-standards-based curriculum can take many forms, and I go back and forth on whether or not any of them is more &#8220;right&#8221; than another.
As an example, when I sat down to plan my class introducing students to these topics, I did so assuming that the verbosity of the browser-native JavaScript API (a.k.a. &#8220;vanilla JS&#8221;) would be better at reinforcing DOM concepts established with HTML and CSS. For example, <code class="codecolorer text default">&lt;span class="text">document.getElementById("holder")&lt;/span></code> makes more sense than jQuery&#8217;s equivalent <code class="codecolorer text default">&lt;span class="text">$("#holder")&lt;/span></code> because we would have already defined Elements and IDs and by calling back to those terms, we reinforce the building blocks. My intention was to work towards the understanding that HTML Elements exist in the document object model and they can be created in many ways, but once you have an Element you can do Element things to it. Vanilla JS&#8217;s plain and descriptive function names seem to serve that intention better than jQuery would.
Introducing students to the Canvas is another idea I go back and forth on. p5.js has built extensively on Processing&#8217;s already simple and flexible functionalities to bring &#8220;creative coding&#8221; to the web. Despite this, I don&#8217;t like using it as a drop-in replacement for the JavaScript portion of a web development curriculum because it would mean less time spent on DOM manipulation. While that may be perhaps less visually stimulating, it fits better into the holistic perspective I&#8217;m trying to teach. Traditional web development and p5 are each better experienced on their own, and I feel it would be unfair to my students to throw away HTML and CSS halfway through the semester because p5 has its own way to do text and style.
Perhaps it&#8217;s just nostalgia for my own design education, but I feel that with Flash&#8217;s demise, we&#8217;ve lost an appealing entry point for studying interaction design.
If the temptation of Flash wasn&#8217;t there 10 years ago, this all would have been a fine and technically-possible way to teach web standards.
my history
what is dom manipulation
what are the concepts that i aim to teach in understanding interaction design?
why teach dom manipulation over p5 (or flash)
what&#8217;s missing? easy entry points (eg drawing in flash)
jquery
browser native api
&nbsp;

 [1]: https://johnresig.com/blog/selectors-in-javascript/
 [2]: https://web.archive.org/web/20111007053754/http://www.adobe.com:80/products/flashplatformruntimes/statistics.displayTab3.html
 [3]: https://krebsonsecurity.com/2017/08/flash-player-is-dead-long-live-flash-player/
 [4]: http://openframeworks.cc/
 [5]: https://www.libcinder.org/
 [6]: https://processing.org/
 [7]: https://p5js.org/
