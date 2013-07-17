$(document).ready( function() {

maxCols = Math.floor(window.innerWidth / 340);
// console.log(($(window).width()/340).floor);
console.log(maxCols);

// console.log(number);

subs = ["", "r/pics/", "r/funny", "r/aww/", "r/gif"];
col = [];
counter = 0;




function buildCol(html, array, sub) {

if (array.length < 3)
	{
		console.log("pushed")
		// console.log(array.length)

		array.push(html);
		return;
	}

else {

		column = $("<ul />", {
		"id" 	: 'column',
		"data-sub"	: sub
		});

	$(column).appendTo("#wrapper");
		// console.log(sub);
	block = array.join(" ");
	$(block).appendTo("ul[data-sub = '" + sub + "']");

	counter++;

	if (counter < maxCols)
	{
		loadJson(subs[counter]);
	}
	else
	{
		return;
	}

	}





}

function fix(url, domain) {
  	if (domain == "i.imgur.com")
  	{
  		return url;
	}
  	else if (domain == "imgur.com")
	{
  		return "http://i.imgur.com/" + url.slice(17) + "m.jpg";
  	}
  	else 
  	{
  		return "";
  	}

}

function getComments(n, cache, array, sub) {
		// console.log(cache);

	console.log(cache.data);
	// console.log(n);
		// n ? n = 0 : n = n;

	{	
		url = "http://reddit.com/comments/" + cache.data.children[n].data.id + ".json?limit=1&sort=hot&jsonp=?";
			console.log(url);
			console.log(n);


		$.getJSON( url, function(json){
			console.log(json);

			// console.log(json);
			// console.log(cache.data.children[n].data.id);

			var article = { "data": {
				"index"		: n,
				"title"		: cache.data.children[n].data.title,
				"permalink"	: cache.data.children[n].data.permalink,
				"url"		: cache.data.children[n].data.url,
				"id"		: cache.data.children[n].data.id,
				"domain"	: cache.data.children[n].data.domain,
				"over_18"	: cache.data.children[n].data.over_18,
				"comment"	: json[1].data.children[0].data.body,
				"author"	: json[1].data.children[0].data.author
					}
			};


			article.data.url = fix(article.data.url, article.data.domain);
			html = Mustache.render(articleTemplate, article.data);
  			// array.push(html);
  			if (n == 5)
  			{
  				buildCol(html, array, sub);
  			}
  			else
  			{
  				n++;
  				buildCol(html, array, sub);
  				getComments(n, cache, array, sub);
  			}

		});

	}
	// console.log(array);
}

function loadJson(sub) {

	this.cache = {};
	// console.log(this.n);

	sub === 'undefined' ? insert = "" : insert = sub;

	subReddit = "http://reddit.com/" + insert + ".json?jsonp=?";
	console.log(insert);


	$.getJSON( subReddit, function(articles){
		this.n = 0;
		this.array = [];
		this.cache = articles;
	getComments(this.n, this.cache, this.array, sub);

	});


}



if ( counter === 0) {
	console.log("this is number " + subs[counter]);
	new loadJson(subs[counter]);
}







});