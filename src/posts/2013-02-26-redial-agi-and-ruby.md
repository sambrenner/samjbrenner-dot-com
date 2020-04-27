---
title: 'Redial: AGI and Ruby'
author: sambrenner
type: post
date: 2013-02-26T13:46:07+00:00
path: /notes/redial-agi-and-ruby/
categories:
  - Redial
  - ITP
  - Ruby
  - Asterisk
---

This week, Redial had me finally becoming familiar with Ruby. We used AGI (Asterisk Gateway Interface) to pull info from the web and have it do something over the phone. My application takes two zipcodes entered on the keypad and sends them to a web service that calculates the distance between them. That distance is then read back to the caller.
Super quick and dirty, no error handling or input validation. Here&#8217;s the <code>extensions.conf</code> &#8211; it takes the two zip codes and sends it to Ruby:

<pre><code>[zip]
exten => s,1,Answer()
same => n,Read(zipA,"beep",5)
same => n,Read(zipB,"beep",5)
same => n,AGI(zip.rb,${zipA},${zipB})
</code></pre>

And here&#8217;s zip.rb &#8211; it takes the zip codes, sends them to [this zip code distance API][1], gets the XML response and tells AGI to read it back to the caller:

<pre><code>#!/usr/bin/ruby

require 'rubygems'
require 'ruby-agi'
require 'net/http'
require 'rexml/document'

agi = AGI.new

zipA = ARGV[]
zipB = ARGV[1]

url = "http://zipcodedistanceapi.cymi.org/rest/distance.xml/" + zipA + "/" + zipB + "/mile"
response = Net::HTTP.get_response(URI.parse(url)).body
doc = REXML::Document.new(response)
miles = REXML::Functions.number(doc.get_text('response/distance')).floor

agi.say_number(miles)
</code></pre>

 [1]: http://zipcodedistanceapi.cymi.org/
