$(document).ready( function() {

	// $("#column").clone().appendTo('#wrapper');
	// $("#column").clone().appendTo('#wrapper');
	// $("#column").clone().appendTo('#wrapper');
	// $("#column").clone().appendTo('#wrapper');




number = Math.floor(window.innerWidth / 340);
// console.log(($(window).width()/340).floor);
console.log(number);

// console.log(number);

subs = ["", "r/pics/", "r/funny", "r/aww/", ""];

	// $("#column").clone().appendTo('#wrapper');
	// loadColumn(subs[i]);


// function loadColumn(sub) {
	// this.loadArticles
for (var i = 0; i < number ; i++) {

	column = "";

	subReddit = "http://reddit.com/" + subs[i] + ".json?jsonp=?";


	$.getJSON( subReddit, function(column){

		array = [];

	for (var i =  0; i < column.data.children.length; i++) {

		// console.log(column.data)

		var article = { "data": {
			"title"		: column.data.children[i].data.title,
			"permalink"	: column.data.children[i].data.permalink,
			"url"		: column.data.children[i].data.url,
			"id"		: column.data.children[i].data.id,
			"domain"	: column.data.children[i].data.domain
				}
			};
  		article.data.url = fix(article.data.url, article.data.domain);
  		html = Mustache.render(articleTemplate, article.data);

  		array.push(html);
		// console.log(array);


  		// $(html).appendTo(column);
		}
		// console.log(array);
		column = Mustache.render(colTemplate, {"articles" : array });

  		$(column).appendTo('#wrapper');


		// $(column).appendTo('#wrapper');

	});
  // info = console.log(data.data.children[3].data.title);
// console.log(column);
  }

  // loadColumn(subs[i]);


		// console.log(array);


// loadColumn("wtf");

function fix(url, domain) {
  		// console.log(object);
  	if (domain == "i.imgur.com")
	{	console.log("good" + domain);
  		return url;
	}
  	else if (domain == "imgur.com")
	{	console.log("fix" + domain);
  	
  		return "http://i.imgur.com/" + url.slice(17) + ".jpg";
  	}
  	else 
  	{
  		return url;
  	}

};
	// object = "blah.com";
	// return object;
  		// console.log(object);



// test = $.getJSON(front);

// console.log(info);
  // console.log(json);
  // console.log(front);

});