var column = '															\
<div class = "column" data-column={{column}}>														\
<div class="inputBox cf"><span class = "r">r/</span><input id ={{column}} type="text" placeholder={{subreddit}}>	</div>\
</div>																	\
';


var newStack = '														\
<ul class="stack" id = {{subreddit}}>									\
	{{#stack}} 															\
	{{{.}}} 															\
	{{/stack}} 															\
</ul> 																	\
';

var articleTemplate = '													\
<li class="article" data-index = {{index}} data-id = {{id}}>			\
	<a id="title">{{{title}}}</a>												\
	<div class = "imageBox">											\
		<p class = "selfText">{{{selfText}}}</p>						\
	{{#url}}															\
		<img src="{{{url}}}">											\
	{{/url}}															\
	</div>																\
</li>																	\
';

var commentTemplate = '													\
	<aside class = "comment">											\
		{{{comment}}} 												\
																		\
		<span>-{{{author}}}</span>											\
																		\
	</aside>															\
';
