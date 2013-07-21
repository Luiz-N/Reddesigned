var column = '															\
<div class = "column" data-column={{column}}>														\
<span class = "r">r/</span><input id ={{column}} type="text" placeholder={{subreddit}}>	\
</div>																	\
';


var subredditTemplate = '														\
<ul class="stack" id = {{subreddit}}>						\
</ul> 																	\
';

var articleTemplate = '													\
<li class="article" data-index = {{index}} data-id = {{id}}>			\
	<h1>{{{title}}}</h1>												\
	{{#url}}															\
	<div class = "imageBox">											\
		<img src="{{{url}}}">											\
	</div>																\
	{{/url}}															\
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