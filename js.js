singleCol = "";

$(document).ready( function() {

number = Math.floor(window.innerWidth / 340);
// console.log(($(window).width()/340).floor);
console.log(number);

// console.log(number);

subs = ["", "r/pics/", "r/funny", "r/aww/", "r/gif"];
columns = [];


	// loadColumns();


// function loadColumn(sub) {
	// this.loadArticles
for (var i = 0; i < number ; i++) {


	subReddit = "http://reddit.com/" + subs[i] + ".json?jsonp=?";


	$.getJSON( subReddit, function(column){

	array = [];


	for (var n =  0, len = column.data.children.length; n < len; n++) {


		var article = { "data": {
			"index"		: n,
			"title"		: column.data.children[n].data.title,
			"permalink"	: column.data.children[n].data.permalink,
			"url"		: column.data.children[n].data.url,
			"id"		: column.data.children[n].data.id,
			"domain"	: column.data.children[n].data.domain,
			"over_18"	: column.data.children[n].data.over_18
				}
			};
  		article.data.url = fix(article.data.url, article.data.domain);

  		  		html = Mustache.render(articleTemplate, article.data);

  		array.push(html);

		singleCol = Mustache.render(colTemplate, {"articles" : array });

  		$(singleCol).appendTo("#wrapper");



	

  	}
};
		// $(columns).appendTo('#wrapper');


  // loadColumn(subs[i]);


		// console.log(array);


// loadColumn("wtf");

function fix(url, domain) {
  		// console.log(object);
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
	// object = "blah.com";
	// return object;
  		// console.log(object);



// test = $.getJSON(front);

// console.log(info);
  // console.log(json);
  // console.log(front);

});