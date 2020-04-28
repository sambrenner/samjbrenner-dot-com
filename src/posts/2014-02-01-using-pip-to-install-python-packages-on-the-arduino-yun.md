---
title: Using pip to install python packages on the Arduino Yún
author: sambrenner
type: post
date: 2014-02-01T22:38:10+00:00
path: /notes/using-pip-to-install-python-packages-on-the-arduino-yun/
categories:
  - Arduino
  - Python
---

The Arduino Yún doesn&#8217;t come with SSL support, which means no pip and no Python packages. Myself, <a href="http://adamquinnstudio.com/" target="_blank">Adam</a> and <a href="http://xc-xd.com/" target="_blank">Xuedi</a> lost about a day of work last semester trying to find the fix for this, until Google-master <a href="http://www.brettjpeterson.com/" target="_blank">Brett</a> saved the day by finding us <a href="http://playground.arduino.cc/Hardware/Yun#installing_python_module" target="_blank">this link</a>. Clearly these instructions need spreading around the internet, so here they are.

SSH into your Yún and issue the following commands:

~~~bash
opkg update
opkg install distribute
opkg install python-openssl
opkg install python-bzip2
easy_install pip
~~~

Then you can use <code>pip install</code> to install whatever packages you need.

**Update, 2015-01-02:** <code>python-ssl</code> seems to have been replaced (or superseded? I&#8217;m not exactly sure) by <code>python-openssl</code>. I updated the code above to reflect this change.
