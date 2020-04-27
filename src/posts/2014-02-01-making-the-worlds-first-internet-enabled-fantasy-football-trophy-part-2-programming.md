---
title: "Making the world's first internet-enabled fantasy football trophy, part 2: programming"
author: sambrenner
type: post
date: 2014-02-01T16:48:24+00:00
path: /notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-2-programming/
categories:
  - Arduino
  - Materials
  - Fabrication
  - ITP
  - Materials and Building Processes
  - Project Write-Up
  - Python
  - Trophy of the Future
---
<img class="aligncenter size-medium wp-image-538" alt="P1090435" src="/img/uploads/2014/02/P1090435-800x460.jpg"  />

In [part 1][1], I walked through the fabrication process of the Trophy of the Future. If you haven&#8217;t read that yet, go check it out! In this post, part 2, I&#8217;m going to discuss the technology behind the trophy.

At the heart of it all is an [Arduino Yún][2], the first Arduino board to also include a Linux processor. The processor runs a [Python script][3] that collects the names of the champions of my fantasy football league, the league&#8217;s standings and NFL news via the Yún&#8217;s built-in WiFi chip and scrolls across a 40&#215;8 LED matrix. The LEDs are controlled on the software side by the [Parola][4] library and on the hardware side by 5 8&#215;8 LED modules, each with its own [MAX7219][5] chip. When the Yún is plugged in, the Arduino processor asks the Linux processor to run the python script, which returns the next line for the LEDs to display. Once the line is finished scrolling, Arduino again asks for the next line, and this continues&#8230; forever!

Here&#8217;s the Python:

<pre><code class="python">from sys import argv
import os
import feedparser
import json
import urllib
import apikey

trophy_data_path = 'http://www.samjbrenner.com/projects/trophy/trophy.json'
nfl_news_path = ''
nfl_news_intro = ''
league_api_path = ''
league_standings_intro = ''
league_api_collection_names = []
news_stories_max = 0
message_buffer_path = 'message_buffer.txt'
offline_data_path = 'offline_data.txt'

def get_next_message():
  message_buffer = open(message_buffer_path, 'a+')
  message_buffer.seek(0)

  # if file is empty, refill buffer
  if message_buffer.readline() == '':
    try:
      get_trophy_data()

      with open(offline_data_path) as offline_data:
        message_buffer.writelines("%s" % item for item in offline_data.readlines()[1:])

      message_buffer.writelines("%s\n" % item for item in get_league_data())
      message_buffer.writelines("%s\n" % item for item in get_nfl_news())

    except IOError as e:
      with open(offline_data_path) as offline_data:
        message_buffer.writelines("%s" % item for item in offline_data.readlines()[1:])

  # get first line
  message_buffer.seek(0)
  next_message = message_buffer.readline()

  # replace file with all lines except for the first line
  remaining_lines = message_buffer.readlines()
  message_buffer.seek(0)
  message_buffer.truncate()
  message_buffer.writelines("%s" % item for item in remaining_lines)
  message_buffer.close()

  print next_message
  return next_message

# network functionality
def get_trophy_data():
  global nfl_news_path, nfl_news_intro, news_stories_max, league_api_path, league_api_collection_names, league_standings_intro

  json_response = urllib.urlopen(trophy_data_path)
  data = json.loads(json_response.read())

  nfl_news_path = data['nfl_news_path']
  nfl_news_intro = data['nfl_news_intro']
  news_stories_max = data['news_stories_max']
  league_api_path = data['league_api_path'].replace('API_KEY', apikey.value)
  league_api_collection_names = data['league_api_collection_names']
  league_standings_intro = data['league_standings_intro']

  store_offline_data(data)

def get_nfl_news():
  nfl_feed = feedparser.parse(nfl_news_path)

  titles = [nfl_news_intro]

  for entry in nfl_feed.entries[:news_stories_max]:
    titles.append(entry.title)

  return titles

def get_league_data():
  json_response = urllib.urlopen(league_api_path)
  data = json.loads(json_response.read())

  standings = [league_standings_intro]

  for collection_name in league_api_collection_names:
    data = data[collection_name]

  for player in sorted(data, key=lambda x:int(x['rank'])):
    standings.append("%s: %s, %s (%s)" % (player['rank'], player['name']['text'], player['record'], player['streak']))

  return standings

# file i/o
def store_offline_data(data):
  offline_data = open(offline_data_path, 'w')

  offline_data.write("%s\n" % data['offline_warning'])

  for line in data['intro_message']:
    offline_data.write("%s\n" % line)

  for champion in data['champions']:
    offline_data.write("%s: %s, %s\n" % (champion['year'], champion['owner'], champion['teamname']))

  offline_data.close()

# instructions
if len(argv) > 1:
  if argv[1] == 'nextmsg':
    get_next_message()
  else:
    print 'Please supply a valid command.'
else:
  print 'Please supply a command.'
</pre></code>

And here&#8217;s the Arduino code:

<pre><code class="cpp">#include &lt;MD_Parola.h&gt;
#include &lt;MD_MAX72xx.h&gt;
#include &lt;SPI.h&gt;
#include &lt;Process.h&gt;

//arduino pins
#define MAX_DEVICES 5
#define CLK_PIN 10
#define DATA_PIN 8
#define CS_PIN 9

//parola
MD_Parola scroller = MD_Parola(DATA_PIN, CLK_PIN, CS_PIN, MAX_DEVICES);
MD_Parola::textEffect_t scrollEffect = MD_Parola::SCROLL_LEFT;
uint8_t frameDelay = 100;

void setup() {
  initScroller();
  Bridge.begin();
  scrollNextMessage();
}

void loop() {
  if (scroller.displayAnimate()) {
    scrollNextMessage();
  }
}

void initScroller() {
  scroller.begin();
  scroller.displayClear();
  scroller.displaySuspend(false);

  scroller.displayScroll("loading...", MD_Parola::LEFT, scrollEffect, frameDelay);
}

void scrollNextMessage() {
  Process process;
  String nextMessage = "";

  process.runShellCommand("python /root/trophy/trophy.py nextmsg");
  while(process.running());

  while(process.available()) {
    nextMessage += (char)process.read();
  }

  char msg[nextMessage.length()];
  nextMessage.toCharArray(msg, nextMessage.length() - 1);

  scroller.displayScroll(msg, MD_Parola::LEFT, scrollEffect, frameDelay);
}
</code></pre>

The reason I went with an Arduino over a similar board like the [Raspberry Pi][6] or [BeagleBone][7] was mainly due to my familiarity with the Arduino interface. The Arduino community has been around for longer and has already worked through a lot of the uncertainties I was trying to eliminate in the project. Finding and testing out the Parola library made me certain that Arduino was the way to go.

The most noteworthy thing about this project (for me, at least) is that it was my first time ever programming with Python. Python was the natural choice because it is supported out of the box on the Yún and because I&#8217;ve been looking for an excuse to learn it for some time now. I started working through &#8220;[Learn Python the Hard Way][8]&#8221; and quickly had the bulk of my trophy code written. The code does a few things:

1. First, it checks my server for a [configuration file][9] that contains the list of champions and URLs for the other APIs I&#8217;ll be calling and some instructions on what to do with them. This will give me a certain amount of control of the trophy even when it&#8217;s in someone else&#8217;s home.
2. Next, it populates a message buffer text file. To do this, it accesses the APIs (one being an NFL news RSS feed and the other being my NFL.com fantasy league&#8217;s standings), formats the responses properly and saves them to the text file. One of the coolest technologies used in this process is [Kimono][10], a totally-pain-free tool for building APIs out of scraped web data (necessary because NFL.com doesn&#8217;t provide their fantasy data in a developer-friendly format).
3. Messages that are not as time-dependent, like the champions and the welcome messages, are also saved to a separate file to be used in case the Yún is unable to access the internet.
4. Any subsequent time that the Arduino asks for a message, the Python program checks to see if there&#8217;s anything in the message buffer and if so, returns it to the Arduino. Once the message buffer is empty, the whole process starts again.

This is enough for an alpha release (and also because the fantasy season ended a month ago and the champion wants his trophy now!) but there are a bunch of things I still want to add:

1. Incorporate pauses between message cycles &#8211; for example, once every hour. I imagine the bright red scrolling LEDs could get annoying pretty quickly.
2. A user-friendly way to configure the Arduino&#8217;s WiFi access. Since the trophy will change hands (and WiFi networks) every year, and most of those people will have had no experience using an Arduino, I need to come up with an easy way they can reconfigure the board to connect to their network.
3. Remote updating. It should be easy to update the Python code remotely. I haven&#8217;t looked into reprogramming the Arduino remotely but I imagine that would be a more difficult task.
4. I would love to play more with animation on the LED matrix. Scrolling text gets a little boring after a while! I&#8217;m thinking I can use an animation program like After Effects to produce a file where 1 pixel of animation equals one 1 LED, and then translate the pixel information to a matrix of 1s and 0s that the Arduino could send to the trophy.

All of the code is on [GitHub][11], so go check it out!

 [1]: /notes/making-the-worlds-first-internet-enabled-fantasy-football-trophy-part-1-fabrication
 [2]: http://arduino.cc/en/Main/ArduinoBoardYun?from=Main.ArduinoYUN
 [3]: https://github.com/sambrenner/future-trophy/blob/master/trophy.py
 [4]: http://parola.codeplex.com/
 [5]: http://playground.arduino.cc/Main/MAX72XXHardware
 [6]: http://www.raspberrypi.org/
 [7]: http://beagleboard.org/
 [8]: http://learnpythonthehardway.org/
 [9]: http://www.samjbrenner.com/projects/trophy/trophy.json
 [10]: http://www.kimonolabs.com/
 [11]: https://github.com/sambrenner/future-trophy/
