function testScroll(ev){
	if(window.pageYOffset>trigger){
		col = stacks.indexOf(trigger);
		currentSubreddit = $("div[data-column="+col+"]");
		currentSubreddit.find(".stack").addClass("launch");
		currentSubreddit.find('.comment').addClass('drop');

		setTimeout(function(){
			// console.log(currentSubreddit.find('.comment'));
			// currentSubreddit.find('.comment').addClass('drop');
		},500);
		currentSubreddit.trigger('nextStack');

	// $.waypoints('refresh');
		// $('.column').trigger('newStack');
		// alert("new stacks");
	}

}

function getAlbumImage(albumID, articleID){
	url = "https://api.imgur.com/3/album/" + albumID;

	$.getJSON( url, function(json){

		object = { "data": {
			"link"		: json.data.images[0].link
			}
		};
		$("li[data-id="+articleID+"]").find("img").attr("src",object.data.link);
	});
}

function fix(url, selfText, articleID){
	imgur = url.toLowerCase().indexOf("imgur") >= 0;
	imgurAlbum = url.toLowerCase().indexOf("/a/") >= 0;
	last3 = url.substr(url.length - 4);
	youtube = url.toLowerCase().indexOf("youtu") >= 0;


	if(last3 === '.gif'){
		return url;
	}
	else if (imgur && last3 === '.jpg'){
		return url.substr(0, url.length-4) + "l.jpg";
	}
	else if (imgur && last3 === '.png'){
		return url.substr(0, url.length-4) + "l.png";
	}
	else if(imgurAlbum){
		albumID = url.split("/a/").pop();
		imageURL = getAlbumImage(albumID, articleID);
		// alert(imageURL);
		return "http://www.redditstatic.com/about/assets/reddit-logo.png";
		// alert(albumID);
	}
	else if(imgur){
		return url + "l.jpg";
	}
	else if(last3 === '.jpg' || last3 === '.png'){
		return url;
	}
	if(youtube){
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match&&match[2].length==11){
		    return "http://img.youtube.com/vi/"+match[2]+"/0.jpg";
		}else if(selfText == ""){
		 return "http://www.redditstatic.com/about/assets/reddit-logo.png";
		}
		else{
			return "";
		}
	}
	else if (selfText == ""){
		return "http://www.redditstatic.com/about/assets/reddit-logo.png"
	}

	else{
		// x = $("img[src="+"'"+url+"'"+"]");
		return "";
	}

	// return "http://i.imgur.com/dB0L3A4m.jpg";
}

function NewStack(col, articles, objects) {

	// newSub = objects[objects.length-1].data.index === 0;
	len = articles.length;
	colNumber = col.attr('data-column');
	stack = [];

		for (var i = 0; i < 5; i++) {
			if (len === 0){
				stacks[colNumber]=99999999999;
				trigger = Array.min(stacks);
				return;
			}
			else{
				stack[i]=(articles.pop());
			}
		}


	this.html = Mustache.render(newStack, {
		"subreddit"	  : object.data.subreddit,
		"stack"   	  : stack
		});

	col.append(this.html);

	for (var i = 0; i < 5; i++) {
		var article = objects.pop();
		new NewArticle(article.data.id, colNumber, article);
	}

	stacks[colNumber]=col.outerHeight() - col.find(".stack").last().outerHeight()-700;
	trigger = Array.min(stacks);

	window.setTimeout(function() {
		current = $("div[data-column="+col.attr('data-column')+"]");
		stacks[col.attr('data-column')]=current.outerHeight() - current.find(".stack").last().outerHeight()-700;
		trigger = Array.min(stacks);
	}, 4000);
	// col.find(".stack");

}
function NewArticle(id, col, object) {
	this.subreddit = "div[data-column="+col+"] ";
	this.article = $(this.subreddit +"li[data-id="+id+"]");
	this.url = this.article.find('img');
	// console.log(object);
	this.article.find('a').attr('href', object.data.original);
	// console.log(object);

	new NewComment(id, this.article);

}

function NewComment(id, parentArticle){
	url = "http://reddit.com/comments/" + id + ".json?limit=1&sort=hot&jsonp=?";

	$.getJSON( url, function(json){
		object = { "data": {
			"id"		: json[0].data.children[0].data.id,
			"comment"	: marked(json[1].data.children[0].data.body),
			"author"	: json[1].data.children[0].data.author
			}
		};
		comment = Mustache.render(commentTemplate, object.data);
		parentArticle.append(comment);
		parentArticle.find('a').attr('target', '_blank');
		console.log(parentArticle.parent().hasClass('launch'));
		setTimeout(function(){
			if (parentArticle.parent().hasClass('launch')) {
				parentArticle.find('.comment').addClass('drop');
			}
		},1000)
		// $('.article a').attr('target', '_blank');
	});

}


function NewSubreddit(subreddit, col) {

	if (subreddit === "r/random") {
		subReddit = getRandom(subreddit);
	}
	else if (subreddit === "reddit") {
		frontPage = true;
		link = "http://reddit.com/" + "" + ".json?jsonp=?";
	}
	else {
		link = "http://reddit.com/" + subreddit  + ".json?jsonp=?";
	}

	this.col = $("div[data-column="+col+"]");

  this.articles = [];
	this.objects = [];
	var stack = this;

	$.ajax( link, {
		dataType: 'json',
		context: stack,
		success: function(page){
			console.log("album image loaded");
			for (var n = page.data.children.length - 1; n >= 0; n--) {

				object = { "data": {
					"author"		: page.data.children[n].data.author,
					"column"		: col,
					"subreddit"	: page.data.children[n].data.subreddit,
					"index"			: n,
					"title"			: page.data.children[n].data.title,
					"permalink"	: page.data.children[n].data.permalink,
					"url"				: page.data.children[n].data.url,
					"original"	: page.data.children[n].data.url,
					"id"				: page.data.children[n].data.id,
					"domain"		: page.data.children[n].data.domain,
					"over18"		: page.data.children[n].data.over_18,
					"selfText"	: marked(page.data.children[n].data.selftext)
						}
					};
				object.data.url = fix(object.data.url, object.data.selfText, object.data.id);
				article = Mustache.render(articleTemplate, object.data);

				this.articles.push(article);
				this.objects.push(object);

				// this.stack.append(article);

				}

		},
		beforeSend: function(){

			exitingStack = $(this.col).find("ul");
			exitingStack.toggleClass("launch");
			inputBox = exitingStack.parent().find("input");

		},

		timeout: 7000,

		error: function() {
			window.setTimeout(function() {
				inputBox.val("");
			}, 2000);
			inputBox.val("Not Found :(");
			exitingStack.toggleClass("launch");
			throw new Exception('Ajax error description');
		},

		complete: function() {
			$(this.col).find("ul").parent().find("input").val("");
			$(this.col).find("ul").remove();
			$(this.col).find('input').blur();
			firstSet = [];

			for (i = 0; i < 5; i++) {
				firstSet[i]=this.articles.pop();
			}

			if (subreddit == "reddit") {
			this.col.find("input").attr('placeholder','reddit');
			// this.col.find("input").val('');

			}
			else {
			this.col.find("input").attr('placeholder',object.data.subreddit);
			}


			this.html = Mustache.render(newStack, {
				"subreddit"	  : object.data.subreddit,
				"stack"   	  : firstSet
				});

			this.col.append(this.html);

			for (i = 0; i < 5; i++) {
				var article = this.objects.pop();
				new NewArticle(article.data.id, col, article);
			}

			randomDelay = Math.floor((Math.random()*800)+200);
		    window.setTimeout(function() {
		    	var currentStack = $("div[data-column="+col+"]");
				currentStack.find(".stack").first().addClass("launch");

		    }, randomDelay);


			new NewStack(this.col, this.articles, this.objects);

		}
	});



	var self = this;
	this.col.off('nextStack');

	this.col.on('nextStack', function() {
		new NewStack(self.col, self.articles, self.objects);
	});
}

Array.min = function( array ){
     return Math.min.apply( Math, array );
  };

  



$(document).ready(function() {
	// frontPage = false;

	//measure number of columns that will fit and set wrapper to total width
	maxCols = Math.floor(window.innerWidth / 450);
	$("#wrapper").css({'width': maxCols*450});

	defaults = ["reddit", "r/pics", "r/funny", "r/aww", "r/gifs"];

	//build each column according to the width of the screen
	for (var i=0; i <= maxCols - 1; i++) {
	object = {"data": {
			"column": i,
			"subreddit": i === 0 ? "" : defaults[i].slice(2)
		}
	};

	html = Mustache.render(column, object.data);
	$(html).appendTo("#wrapper");
	//load default subreddit for respective column
	new NewSubreddit(defaults[i], i);
	}

	stacks = [];
	trigger = 10000;
	window.onscroll=testScroll;

	// BELOW NEEDS TO BE MOVED OUT OF DOC.READY
	// BELOW NEEDS TO BE MOVED OUT OF DOC.READY 
	// BELOW NEEDS TO BE MOVED OUT OF DOC.READY 



	$(".inputBox").waypoint('sticky');



	$(".links a").on("click", function(e) {
		e.preventDefault();
		console.log(e);

		subreddit = "r/" + e.currentTarget.innerHTML;
		column = $(".column").length-1
		new NewSubreddit(subreddit, column);
	});

	$(".links").on("click", function(e) {
		links = $(this).children('a');
		console.log(links);
		columns = [];
		columnLength = $(".column").length
		console.log(columnLength);
		for (var i = 0; i < columnLength; i++) {
			columns[i] = i
			}
		console.log(columns);
		for (var i = links.length - 1; i >= 0; i--) {
			subreddit = "r/" + links[i].innerHTML;
			column = columns.pop()
			new NewSubreddit(subreddit, column)
			console.log(column);
		};

	});


	$(".column").on('keyup', 'input' ,function(e){
		col = e.currentTarget.id
		elem = $("#"+col);
		value = elem.val();
		sub = "r/" + value;
   if(e.which === 13){
   		// elem.val() === "reddit" ? sub = "" : sub = sub;
		if (value == 'reddit' || value == 'front' || value == '')
		{
		value = 'reddit';
   		new NewSubreddit( value, col);
		}
		else
		{
   		new NewSubreddit( sub, col);
   	}

   }
	});

	$("#about").on('click',function (event) {
		event.preventDefault();
		window.open("https://github.com/Luiz-N/Reddesigned", "_blank")
	})


});
