Reddesigned
=========

www.Reddesigned.com

###Stack:

* HTML/SASS
* Javascript/Jquery
* Mustache
* Reddit API

This was an educational pet project that I built the bulk of between [Thinkful](www.thinkful.com) and [DBC](www.devbootcamp.com).

This project came from my realization that when browsing reddit I usually only cared about 3 things:

1. The title
2. The content
3. The top comment

This was my first personal deep dive into Object Oriented Javascript. Thus, the javascript is quite messy. (Planning on learning backbone by refactoring into it)
This was also my first time learning how to use an API and even push it's boundries. I also wanted to take on the challenge of making it compatible for any size screen device.

###Points of interest:

* Neither Masonry or any such library is being used
* Mustache Templates are being used to build the articles and columns
* Every column is one subreddit that can be changed dynamically
* Every article has the top comment shown below the content
* Discovered reddit api bug (working on pull request)

###Persoanl Critique:

####PROS:

1. Every column is one subreddit and can be changed dynamically
2. Fits as many columns to the screen as can fit. (thus works for any size screen)
3. Every article has the top comment shown below the content
4. Allows for very efficient browsing of reddit

####CONS:

1. Very noisy... Reddit is inherently a noisy place but some design magic could be used to dampen things
2. Can't support all content types. (I tried my best for images/albums but not everything is currently viewable)
3. Color scheme could use a complete revamp.... (only so much time in the day)
4. The Javascript is fairly messy... (This was my first time attemping O.O. J.S.)


Feel free to fork and tear it apart if you'd like. 

