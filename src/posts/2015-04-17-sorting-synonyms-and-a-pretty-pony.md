---
title: Sorting, synonyms and a pretty pony
author: sambrenner
type: post
date: 2015-04-17T15:08:07+00:00
path: /notes/sorting-synonyms-and-a-pretty-pony/
categories:
  - Cooper Hewitt
---
_This post was originally published on the [Cooper Hewitt Labs blog][1]._

We&#8217;ve been undergoing a massive rapid-capture digitization project here at the Cooper Hewitt, which means every day brings us pictures of things that probably haven&#8217;t been seen for a very, very long time.
As an initial way to view all these new images of objects, I added &#8220;date last photographed&#8221; to our search index and allowed it to be [sorted by on the search results page][2].

That&#8217;s when I found this.

<a href="http://collection.cooperhewitt.org/objects/18692335" rel="attachment wp-att-2592"><img class="aligncenter size-full wp-image-2592" src="/img/uploads/2015/04/110747_470f2e4c7611261e_z.jpg" alt="110747_470f2e4c7611261e_z" width="640" height="504" /></a>

I hope we can all agree that this pony is adorable and that if there is anything else like it in our collection, it needs to be seen right now. I started browsing around the other recently photographed objects and began to notice more animal figurines:

<a href="http://collection.cooperhewitt.org/objects/18460201" rel="attachment wp-att-2593"><img class="aligncenter size-full wp-image-2593" src="/img/uploads/2015/04/110852_dc5f8ad6ab8c53c1_z.jpg" alt="110852_dc5f8ad6ab8c53c1_z" width="461" height="640" /></a> <a href="http://collection.cooperhewitt.org/objects/18615463" rel="attachment wp-att-2591"><img class="aligncenter size-full wp-image-2591" src="/img/uploads/2015/04/109502_2502a0cfe13e9f31_z.jpg" alt="109502_2502a0cfe13e9f31_z" width="640" height="531" /></a>

As serendipitous as it was that I came across this wonderful collection-within-a-collection by browsing through recently-photographed objects, what if someone is specifically looking for this group? The whole process shows off some of the work we did last summer [switching our search backend over to Elasticsearch][3] (which I recently presented at [Museums and the Web][4]). We wanted to make it easier to add new things so we could provide users (and ourselves) with as many &#8220;ways in&#8221; to the collection as possible, as it&#8217;s those entry points that allow for more emergent groupings to be uncovered. This is great for somebody who is casually spending time scrolling through pictures, but a user who wants to browse is different from a user who wants to search. Once we uncover a connected group of objects, what can we do to make it easier to find in the future?

Enter [synonyms][5]. Synonyms, as you might have guessed, are a text analysis technique we can use in our search engine to relate words together. In our case, I wanted to relate a bunch of animal names to the word &#8220;animal,&#8221; so that anyone searching for terms like &#8220;animals&#8221; or &#8220;animal figurines&#8221; would see all these great little friends. Like this bear.

<a href="http://collection.cooperhewitt.org/objects/18633719" rel="attachment wp-att-2594"><img class="aligncenter size-full wp-image-2594" src="/img/uploads/2015/04/110995_0048b6b3bc272bd1_z.jpg" alt="110995_0048b6b3bc272bd1_z" width="557" height="640" /></a>

The actual rule (generated with the help of Wikipedia&#8217;s [list of animal names][6]) is this:

<pre><code>"animal" => "aardvark, albatross, alligator, alpaca, ant, anteater, antelope, ape, armadillo, baboon, badger, barracuda, bat, bear, beaver, bee, bird, bison, boar, butterfly, camel, capybara, caribou, cassowary, cat, kitten, caterpillar, calf, bull, cheetah, chicken, rooster, chimpanzee, chinchilla, chough, clam, cobra, cockroach, cod, cormorant, coyote, puppy, crab, crocodile, crow, curlew, deer, dinosaur, dog, puppy, salmon, dolphin, donkey, dotterel, dove, dragonfly, duck, poultry, dugong, dunlin, eagle, echidna, eel, elephant, seal, elk, emu, falcon, ferret, finch, fish, flamingo, fly, fox, frog, gaur, gazelle, gerbil, panda, giraffe, gnat, goat, sheep, goose, poultry, goldfish, gorilla, blackback, goshawk, grasshopper, grouse, guanaco, fowl, poultry, guinea, pig, gull, hamster, hare, hawk, goshawk, sparrowhawk, hedgehog, heron, herring, hippopotamus, hornet, swarm, horse, foal, filly, mare, pig, human, hummingbird, hyena, ibex, ibis, jackal, jaguar, jellyfish, planula, polyp, scyphozoa, kangaroo, kingfisher, koala, dragon, kookabura, kouprey, kudu, lapwing, lark, lemur, leopard, lion, llama, lobster, locust, loris, louse, lyrebird, magpie, mallard, manatee, mandrill, mantis, marten, meerkat, mink, mongoose, monkey, moose, venison, mouse, mosquito, mule, narwhal, newt, nightingale, octopus, okapi, opossum, oryx, ostrich, otter, owl, oyster, parrot, panda, partridge, peafowl, poultry, pelican, penguin, pheasant, pigeon, bear, pony, porcupine, porpoise, quail, quelea, quetzal, rabbit, raccoon, rat, raven, deer, panda, reindeer, rhinoceros, salamander, salmon, sandpiper, sardine, scorpion, lion, sea urchin, seahorse, shark, sheep, hoggett, shrew, skunk, snail, escargot, snake, sparrow, spider, spoonbill, squid, calamari, squirrel, starling, stingray, stinkbug, stork, swallow, swan, tapir, tarsier, termite, tiger, toad, trout, poultry, turtle, vulture, wallaby, walrus, wasp, buffalo, carabeef, weasel, whale, wildcat, wolf, wolverine, wombat, woodcock, woodpecker, worm, wren, yak, zebra"
</pre></code>

Where every word to the right of the => automatically gets added to a search for a word to the left.

Not only does our new search stack provide us with a useful way to discover emergent relationships, but it makes it easy for us to &#8220;seal them in,&#8221; allowing multiple types of user to get the most from our collections site.

 [1]: http://labs.cooperhewitt.org/2015/sorting-synonyms-and-a-pretty-pony/
 [2]: https://collection.cooperhewitt.org/search/collection?query=*&sort=relevance&sort_order=desc&sort=date_last_photographed
 [3]: https://labs.cooperhewitt.org/2014/rethinking-search-on-the-collections-site/
 [4]: http://mw2015.museumsandtheweb.com/paper/reconsidering-searching-and-browsing-on-the-cooper-hewitts-collections-website/
 [5]: http://www.elastic.co/guide/en/elasticsearch/guide/current/using-synonyms.html
 [6]: https://en.wikipedia.org/wiki/List_of_animal_names
