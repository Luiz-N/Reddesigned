


// var $container = $('#container');

column = $("<ul />", {
	"id" : 'column'
});



title = $("<h1 />");

title.text("test");

article = $("<li />", {
	"class" : 'article'
}).clone().append(title);

// title.text = "test";

// item.title.text = "boom bitches";

column.clone().append(article);



// // initialize
// $container.masonry({
//   columnWidth: 50,
//   itemSelector: '.item'
// });

$(document).ready(function(){

for (var i=0; i < 4; i ++){
$("body").clone().append(column);
}




// $container.innerhtml(item);



});