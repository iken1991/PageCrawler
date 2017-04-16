var http = require('http');
var cheerio = require('cheerio');

var trim = function(str){
	return !!str? str.replace(/^\s+|\s+$/g, ''): '';
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

var fetchArticles = function(html, target){
	var articls = [], article = '';

	var $ = cheerio.load(html);
	article = trim($(target).text());

	if(!!article){
		article = '<div>' + article.replace(/\r\n/g, '<br>') + '</div>';
		return article;
	}
	return '';
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
		console.log('http get error');
	});
};

var init = function(){
	var destPages = [
		{ url: 'http://www.cnbeta.com', target: 'dl>dt>a', attribute: 'href'}
	];

	var articles = [];
	
	for(var pageIndex = 0, page; page = destPages[pageIndex]; pageIndex++){
		getHtml(page.url, (function(target, attribute){
			var _target = target, _attribute = attribute;
			return function(html){
				var urls = fetchDomsFromHtml(html, _target, _attribute);

				for(var urlIndex = 0, articleUrl; articleUrl = urls[urlIndex]; urlIndex++){
					getHtml(articleUrl, (function(target, urlIndex){
						var _target = target, _urlIndex = urlIndex;
						return function(html){
							var article = fetchArticles(html, _target);
							if(!!article){
								articles.push({
									'id': _urlIndex,
									'content': article
								});
							}
						}
					})('.cnbeta-article', urlIndex));
				}
			};
		})(page.target, page.attribute));
	}
};

init();