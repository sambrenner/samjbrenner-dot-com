---
title: Visualizing NYC high school dropouts
author: sambrenner
type: post
date: 2013-06-05T19:58:39+00:00
path: /notes/nyc-high-school-dropouts/
categories:
  - Sculpting Data Into Everyday Objects
  - 3D Printing
  - Data Representation
  - Fabrication
  - ITP
  - Project Write-Up
---

For our final project in [Sculpting Data Into Everyday Objects][1], I worked with [Ben Kauffman][2] to visualize the cohort<sup>1</sup> dropout rate for high schools in New York City using data from the city&#8217;s [Department of Education][3].
Each bead on the map represents one high school in New York City, placed in its geographic location. The length of the string represents how many students dropped out from that high school. A bead is glued at each end to hold the string in place and enable it to hang down. If there are multiple high schools at one location, extra beads are added.

[<img class="aligncenter size-medium wp-image-429" alt="web_IMG_9859" src="/img/uploads/2013/06/web_IMG_9859-800x909.jpg"  />][4]

[<img class="aligncenter size-medium wp-image-430" alt="web_IMG_9873" src="/img/uploads/2013/06/web_IMG_9873-600x327.jpg"  />][5]

[<img class="aligncenter size-medium wp-image-431" alt="web_IMG_9876" src="/img/uploads/2013/06/web_IMG_9876-600x400.jpg"  />][6]

[<img class="aligncenter size-medium wp-image-432" alt="web_IMG_9886" src="/img/uploads/2013/06/web_IMG_9886-600x475.jpg"  />][7]

[Processing][8] was used to parse and organize the data. Rhino was used to conceptualize the hanging beads and model the shelf from which the strings hang. We printed the shelf using the ZCorp 650 3D printer at NYU’s [Advanced Media Studio][9]. The cutting of string and gluing beads was done by hand.

The [data][3] [was][10] gathered and released by the New York City Department of Education. For every high school in the city, the data tracked members of the class of 2011 starting from their enrollment in 2007. If at the end of the four year period the student has not graduated or is not still enrolled, he or she is considered to have dropped out.

Despite placing schools on the city map, the data tends to resist all-encompassing theories on school attendance. Comparing dropout rates based on borough, neighborhood income level, or race and ethnicity distribution showed no correlations. This may be the result of NYC DOE policy which allows students to attend schools far from their home.

Our findings are granular and raise more questions than they answer. For instance, what explains the disparity between Bushwick Community High School and the Academy of Environmental Leadership, with dropout rates of 41% and 16%, respectively? After all, the two schools are only a few blocks apart. Local and individual analysis of schools, rather than broad patterns, may provide better insight.

<sup>1</sup> The University of Minnesota’s [National Center on Secondary Education and Transition][11] lists [three ways dropout rates can be calculated][12]: the event rate, which measures dropouts in a single year; the status rate, which divides non-enrolled and non-graduated students of a certain age range by all members of that age range; and the cohort rate, which follows a specific group of students over a set period of time. The data represented here is the cohort rate over four years.

 [1]: http://itp.nyu.edu/classes/sdieo-spring2013/
 [2]: http://benkauffman.com
 [3]: schools.nyc.gov/Accountability/data/GraduationDropoutReports/default.htm
 [4]: /img/uploads/2013/06/web_IMG_9859.jpg
 [5]: /img/uploads/2013/06/web_IMG_9873.jpg
 [6]: /img/uploads/2013/06/web_IMG_9876.jpg
 [7]: /img/uploads/2013/06/web_IMG_9886.jpg
 [8]: http://processing.org/
 [9]: http://www.nyu.edu/its/ams/
 [10]: http://books.google.com/books?id=nRduHUeIzvAC&pg=PA53&lpg=PA55&ots=RmmJmyYVHd&q&f=false#v=onepage&q&f=false
 [11]: http://www.ncset.org/
 [12]: http://ncset.org/publications/essentialtools/dropout/part1.2.asp
