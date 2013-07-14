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

		console.log(column.data)

		var article = { "data": {
			"title"		: column.data.children[i].data.title,
			"permalink"	: column.data.children[i].data.permalink,
			"url"		: column.data.children[i].data.url,
			"id"		: column.data.children[i].data.id,
			"domain"	: column.data.children[i].data.domain
				}
			};
  		// article.data.url = test(article.data.url);
  		html = Mustache.render(articleTemplate, article.data);

  		array.push(html);
		// console.log(array);


  		// $(html).appendTo(column);

		}
		console.log(array);
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

// function test(object) {
  		// console.log(object);

	// object = "blah.com";
	// return object;
  		// console.log(object);



// test = $.getJSON(front);

// console.log(info);
  // console.log(json);
  // console.log(front);

});