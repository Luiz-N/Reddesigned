var colTemplate = '														\
<ul class="column" data-column = {{column}} data-subreddit = {{subreddit}}>\
	<input type="text" id={{column}} placeholder={{subreddit}}>						\
	{{#articles}} 														\
		{{{.}}} 														\
	{{/articles}} 														\
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