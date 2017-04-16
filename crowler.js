var http = require('http');
var cheerio = require('cheerio');

var trim = function(str){
	return !!str? str.replace(/^\s+|\s+$/g, ''): '';
};

var filterSource = function(html){
	var $ = cheerio.load(html);

	var articles = $('.item');
	articles.each(function(index, ele){
		var url = $(ele).find('dl>dt>a');
		console.log(title);
	});
};

var fetchDomsFromHtml = function(html, target, attribute){
	var doms = [], dom = '';

	var $ = cheerio.load(html);
	$(target).each(function(index, ele){
		dom = !!attribute? $(ele).attr(attribute): $(ele);
		index === 1 && console.log($(ele).attr);
		!!trim(dom) && doms.push(dom);
	});

	return doms;
};

var getHtml = function(url, callback){
	var html;

	http.get(url, function(res){
		res.on('data', function(data){
			html += data;
		});

		res.on('end', function(){
			!!callback && callback(html);
		});
	}).on('error', function(){
		console.log('http error');
	});
};

var init = function(){
	var destPages = [
		{ url: 'http://www.cnbeta.com', target: 'dl>dt>a', attribute: 'href'}
	];

	var res = [];
	
	for(var pageIndex = 0, page; page = destPages[pageIndex]; pageIndex++){
		getHtml(page.url, (function(target, attribute){
			var _target = target, _attribute = attribute;
			return function(html){
				var urls = fetchDomsFromHtml(html, _target, _attribute);
				console.log(JSON.stringify(urls));
			};
		})(page.target, page.attribute));
	}
};

init();