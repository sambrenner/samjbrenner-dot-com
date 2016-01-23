---
layout: post
title: Recreating Total Terminal's Visor Functionality in El Capitan with Applescript and Quicksilver
tags:
- Mac
- Applescript

---

Mac OS X 10.11 (El Capitan) introduced System Integrity Protection (SIP), most notable in my world because it [breaks TotalFinder](http://discuss.binaryage.com/t/totalfinder-status-under-os-x-10-11-el-capitan/3858). You could get around this by disabling SIP, but [it's there for a reason](http://arstechnica.com/apple/2015/09/os-x-10-11-el-capitan-the-ars-technica-review/8/#h1), which has sent hoards of TotalFinder users seeking an alternative. Since TotalFinder did a lot of different things, each user's ideal replacement is different. I wasn't too much of a TotalFinder power user myself, in fact, I used it only for its Visor functionality which brought a Finder window to the front via a global hotkey.

Fortunately, this functionality is easily reproduced using [this Applescript](http://superuser.com/a/980960/539317):

{% highlight applescript linenos %}
if visible of application "Finder" is false then
    activate application "Finder"
else
    tell application "Finder"
        set visible to false
    end tell
end if
{% endhighlight %}

To run this script with a hotkey, you'll need another program. [Quicksilver](https://qsapp.com/) has long been a favorite of mine and it is perfect for the task. Even if you don't run Quicksilver for its main purpose (I've used it as a Spotlight replacement since years ago when Spotlight was terrible, though it is much improved now), it is super lightweight and is fine running in the background. The instructions to hook it up to the Applescript are laid out in [this Lifehacker article](http://lifehacker.com/5749811/turn-any-action-into-a-keyboard-shortcut-on-your-mac), but I'll repeat them here:

1. Save the above Applescript to your computer somewhere (the extension for Applescript files is `.applescript`)
2. Invoke Quicksilver and open its preferences menu (Command-,)
3. Switch to the Triggers tab
4. Click the + icon at the bottom and create a new Keyboard shortcut
5. Type the path to where you saved the Applescript on your computer (e.g. `~/applescripts/visor.applescript`)
6. Make sure the action is "Run" (this should happen by default) and then click "Save"
7. Double-click where it says "None" in the "Trigger" column and then type your desired global keyboard shortcut to set it
8. All done!

![Quicksilver Triger Menu](/assets/quicksilver.png)

