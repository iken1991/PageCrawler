var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.imooc.com/learn/348';

function filterChapter(html){
	var $ = cheerio.load(html);

	var chapters = $('.chapter');
	chapters.each(function(item){
		var chap = $(this);
		var title = chap.find('strong').text();
		console.log(title);
	});
}

http.get(url, function(res){
	var html;

	res.on('data', function(data){
		html += data;
	});

	res.on('end', function(){
		filterChapter(html);
	});
}).on('error', function(){
	console.log('http error');
});