singleCol = "";

$(document).ready( function() {

maxCols = Math.floor(window.innerWidth / 340);
// console.log(($(window).width()/340).floor);
console.log(maxCols);

$("#wrapper").css({'width': maxCols*340});

// console.log(number);

subs = ["", "r/pics", "r/funny", "r/aww", "r/gif"];



	for (var i=0; i <= maxCols - 1; i++) {
		loadSubreddit(subs[i], maxCols);
	};

// setTimeout(loadComments(),5000);


function loadSubreddit(sub, num, col) {
ids = [];
counter = 0;


	// $.getJSON( "http://reddit.com/subreddits/search/fist", function(page){
	// 	console.log(page);
	// 	console.log("loaded!");


	// });

	// if (sub === "r/random") {
	// 	subReddit = getRandom(sub);
	// }
	// else {
	// 	subReddit = "http://reddit.com/" + sub + ".json?jsonp=?";
	// }

		subReddit = "http://reddit.com/" + sub + ".json?jsonp=?";


	$.getJSON( subReddit, function(page){
		console.log(page);

	array = [];
	// console.log(page.data.children[0]);

	for (var n =  0, len = page.data.children.length; n < len; n++) {

		article = { "data": {
			"author"	: page.data.children[n].data.author,
			// "column"	: column,
			"subreddit"	: page.data.children[n].data.subreddit,
			"index"		: n,
			"title"		: page.data.children[n].data.title,
			"permalink"	: page.data.children[n].data.permalink,
			"url"		: page.data.children[n].data.url,
			"id"		: page.data.children[n].data.id,
			"domain"	: page.data.children[n].data.domain,
			"over_18"	: page.data.children[n].data.over_18
				}
			};

		ids.push(article.data.id);
  		article.data.url = fix(article.data.url, article.data.domain);
		// article.data.column = column;
  		html = Mustache.render(articleTemplate, article.data);

  		array.push(html);

  	};
  		column = col || subs.indexOf(sub);

  		object = { "data" : {
  			"articles" 	: array,
  			"subreddit"	: column === 0 ? "" : sub.slice(2),
  			"column"	: column
  					}
  		};



		singleCol = Mustache.render(colTemplate, object.data);

  		$(singleCol).appendTo("#wrapper");


  		counter++;
  		console.log("counter: " + counter);
  		console.log("n: " + num);


		if (counter == num) { 
  		loadComments(ids, object.data.column);
		 }

  	
	});
}

function loadComments(ids, column) {


	check = [];

	console.log("executed");
		console.log(column);



	for (var i = 0, len = ids.length; i < len; i++) {

		url = "http://reddit.com/comments/" + ids[i] + ".json?limit=1&sort=hot&jsonp=?";

		$.getJSON( url, function(json){
		// console.log(json);



			object = { "data": {
				"id"		: json[0].data.children[0].data.id,
				"comment"	: marked(json[1].data.children[0].data.body),
				"author"	: json[1].data.children[0].data.author
				}
			};

			// console.log(object.data);

			comment = Mustache.render(commentTemplate, object.data);
			// console.log("ul[data-id = '" + object.data.id + "']");
			// console.log($.inArray( object.data.id, check ));

			if (jQuery.inArray( object.data.id, check ) == -1)
			{	console.log(column);
				// console.log($("#"+column).children());
				if (ids.length > 25) {
				$(comment).appendTo("li[data-id = '" + object.data.id + "']");
					check.push(object.data.id);
				}

				else {
				$("ul[data-column="+column+"]").children("li[data-id = '" + object.data.id + "']").append(comment);
				console.log($("ul[data-column="+column+"]").children().val());
			}

			}

		});
		
	}
}
	
$("#wrapper").on('keyup', 'input' ,function(e){

		col = e.currentTarget.offsetParent.dataset.column;
		elem = $("#"+col);
		sub = "r/" + elem.val();
		console.log(sub);
   if(e.which === 13){
   	elem.val() === "" ? sub = "" : sub = sub;
	loadSubreddit(sub, 1, col);
	elem.parent().remove();
   }
});


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


function getRandom(sub) {
	$.get("http://reddit.com/"+sub, function(data){
	console.log("randomfied");

		console.log(data);
		return data;
	});
}

	// object = "blah.com";
	// return object;
  		// console.log(object);



// test = $.getJSON(front);

// console.log(info);
  // console.log(json);
  // console.log(front);

});