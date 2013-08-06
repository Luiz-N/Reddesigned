var column = '															\
<div class = "column" data-column={{column}}>														\
<span class = "r">r/</span><input id ={{column}} type="text" placeholder={{subreddit}}>	\
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
	<h1>{{{title}}}</h1>												\
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
	<span>{{author}}</span>	said										\
		<p> {{{comment}}} 												\
		</p>															\
																		\
		<span>{{{name}}}</span>											\
																		\
	</aside>															\
';