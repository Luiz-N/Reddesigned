var colTemplate = '	\
<ul id="column"> 	\
	{{#articles}} 	\
		{{{.}}} 	\
	{{/articles}} 	\
</ul> 				\
';

var articleTemplate = '			\
<li class="article">			\
	<h1>{{{title}}}</h1>		\
								\
	<div class = "imageBox">	\
		<img src="{{{url}}}">	\
	</div>						\
								\
	<aside class = "comment">	\
								\
		<p> {{comment}} 		\
		</p>					\
								\
		<span>{{name}}</span>	\
								\
	</aside>					\
</li>							\
';