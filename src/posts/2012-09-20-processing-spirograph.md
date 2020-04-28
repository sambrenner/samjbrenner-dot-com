---
title: Processing Spirograph
author: sambrenner
type: post
date: 2012-09-20T07:50:58+00:00
path: /notes/processing-spirograph/
categories:
  - Processing
  - Experiments
uses:
  - processing.js
---
I was showing some of my [Processing][1] experiments to classmates here at ITP and it was asked &#8211; nay, demanded &#8211; that I post about them on my blog. So I&#8217;ll kick things off with this little [Spirograph][2]-inspired play-thing, which creates some pretty beautiful objects with a relatively small amount of code:

<canvas data-processing-sources="/img/uploads/pde/spirograph_lines.pde"></canvas>

Click through for the code and an explanation of what&#8217;s going on here.

~~~java
float a,b,h,xpos,ypos,oxpos,oypos,t,ot,d,od;
int centerX,centerY;

void setup() {
  size(600,600);
  colorMode(HSB,360);
  background(0);
  centerX = width/2;
  centerY = height/2;
}

void draw() {
  background(0);

  a = mouseX;
  b = 60;
  h = mouseY;

  for(int i=1; i<361; i+=1) {
    t = radians(i);
    ot = radians(i-1);
    d = a*t;
    od = a*ot;

    oxpos = (a-b)*cos(ot)+h*cos(od);
    oypos = (a-b)*sin(ot)+h*sin(od);

    xpos = (a-b)*cos(t)+h*cos(d);
    ypos = (a-b)*sin(t)+h*sin(d);

    stroke(i-1,360,360);
    line(centerX+oxpos, centerY+oypos, centerX+xpos, centerY+ypos);
  }
}

void mousePressed() {
  save("spiro_big_"+a+"_"+b+"_"+h+".tif");
}
~~~

The code is up on [GitHub][3], and I&#8217;ve added it above for reference. When I began trying to recreate a Spirograph in Processing, I figured there has to be a formula to describe these shapes. And sure enough, there is! I came across [this post at Wolfram Mathworld][4] about the shapes, properly known as hypotrochoids (definitely click that link; their animated gifs will make everything that follows much easier to visualize). That site describes the shapes straightforwardly:

> A hypotrochoid is a roulette traced by a point **P** attached to a circle of radius **b** rolling around the inside of a fixed circle of radius **a**, where **P** is a distance **h** from the center of the interior circle.

Consider how Spirographs work. A pen is placed in a hole in a small plastic disc. You move that disc around the inside of a larger circle and the pen traces its path. Observe this picture of a small Spirograph set (source: [Wikipedia][5]).

<img class="size-full wp-image-87 alignnone" title="spirographset" src="/img/uploads/2012/09/spirographset.jpg" alt=""  />

All the holes in the inner pieces (the blue, red and turquoise discs) determine **h**, the distance of point **P** from the center of the inner piece. The different sizes of the inner pieces reflect variations of the radius **b**, and the different sizes of outer pieces (the large holes with teeth, one on the left and one on the right) reflect variations of the radius **a**. Processing allows us to take this one step further: since we are not relying on a mechanical system to draw our shapes, we can do things like move point **P** outside the inner piece, or make the inner piece bigger than the circle it&#8217;s rotating inside. I&#8217;ve also tied some of the equation&#8217;s values to the user&#8217;s mouse position, allowing us to see all different kinds of shapes without having to get out a new piece from the Spirograph kit.

At the core of all this is a simple equation that I&#8217;ve found myself coming back to frequently with Processing. It&#8217;s the equation to find the coordinates of a point on the edge of a circle, given the radius of the circle and the angle at which to find the point.

~~~java
x=r*cos(t);
y=r*sin(t);
~~~

Here, **t** is the angle, in radians, at which to find the point. And **r** is the radius of the circle. If you were to run this code in a loop from 0 to 2π (360 degrees in radians) and draw a dot at each point, you would see a circle formed.
Now look at the formula for the hypotrochoid:

~~~java
xpos=(a-b)*cos(t)+h*cos(((a-b)/b)*t);
ypos=(a-b)*sin(t)+h*sin(((a-b)/b)*t);
~~~

You can see some similarities here. Instead of dealing with a constant center point, however, now we&#8217;re dealing with one that moves. So whereas before we were just multiplying the sine and cosine of the angle by **r**, now we&#8217;re multiplying them by **a**&#8211;**b**, or one radius minus the other. That gives us the location of the center point of the inner circle. To this, we still have to add the pen&#8217;s position, and at this point I must apologize as we begin to reach the limits of my amateur mathematical knowledge. I&#8217;ll do my best to explain it and encourage anyone who knows better to correct me via email (you can find my email address on the [About][6] page). Before, **t** was all we needed to plug in because we&#8217;re going around the outer circle and thus the angle progresses sequentially from 0 to 360 degrees. The angle of the pen to its center point is also going from 0 to 360 sequentially, but because it&#8217;s additionally rotating around the outer circle, its rotation is compounded. Somehow &#8211; and this I don&#8217;t really understand &#8211; multiplying **t** by (**a**&#8211;**b**)/**b** solves this.

&#8220;But wait!&#8221; I hear you say. &#8220;I read your source code, and you&#8217;re not even using this!&#8221; You are correct. By means of a happy accident, I am using the following formula:

~~~java
xpos = (a-b)*cos(t)+h*cos(a*t);
ypos = (a-b)*sin(t)+h*sin(a*t);
~~~

Notice the much less complicated math going on the final part of each line. What this appears to do is reduce the level of detail in the hypotrochoid. Instead of many smooth points, it jumps around the canvas more, though it ultimately forms a complete path. This results in more straight lines, which sometimes create some very cool shapes that wouldn&#8217;t be possible on a regular Spirograph. It also lets me complete the path with only 360 iterations of the loop. With the original formula, 360 iterations only results in the equivalent of one revolution of the inner circle around itself, forming an incomplete shape. To get a complete shape, I had to run the code through tens of thousands of iterations, which bogged down my computer. After a bit of messing around, I found the results of just multiplying just **a** and **t** to be satisfactory. And again, the math to this is beyond my grasp. Sorry.

Finally, I&#8217;d like to share a little trick with you. There&#8217;s something else going on in the code besides all the math, and of course I&#8217;m talking about that bad ass rainbow color scheme. And it&#8217;s really easy to implement as well! If you look in my setup function, you will find this line:

    colorMode(HSB,360);

This does two things. One, it changes the color mode from the default RGB to HSB. HSB stands for &#8220;Hue, Saturation, Brightness&#8221; and is another way of determining color values. The second parameter, 360, changes the scale of values. Whereas in RGB we normally think of values in terms of 0 to 255, now we&#8217;re just stretching it out to be 0 to 360. I chose 360 because of how many times the hypotrochoid line-drawing code runs. By the time it completes its iterations, it will be back at the color at which it started, making a smooth transition. Before drawing each line, I call the stroke function and instead of passing in the parameters as R, G and B, I pass them in as H, S and B. Saturation and brightness remain at their maximum values of 360, and hue goes from 0 (red) to 360 (also red, but having passed through the rest of the spectrum).

Alright. That&#8217;s it. I think the rest of my code is pretty self explanatory so I won&#8217;t go in to detail on it unless someone asks. Thanks for reading!

 [1]: http://www.processing.org
 [2]: http://en.wikipedia.org/wiki/Spirograph
 [3]: https://github.com/sambrenner/spirograph
 [4]: http://mathworld.wolfram.com/Hypotrochoid.html
 [5]: http://en.wikipedia.org/wiki/File:Spirograph.jpg
 [6]: http://www.samjbrenner.com/about
