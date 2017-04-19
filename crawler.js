var http = require('http');
var cheerio = require('cheerio');
var util = require('./util');
var config = require('./config');

var fetchTopicUrlList = function(html, website){
	var $ = cheerio.load(html);
	var urlList = [];

	if(website.isAbs){
		$(website.target).each(function(index, ele){
			urlList.push($(ele).attr(website.targetAttribute))
		});
	}else{
		var url = '';
		$(website.target).each(function(index, ele){
			url = util.trim($(ele).attr(website.targetAttribute));
			!!url && urlList.push(website.website + url);
		});
	}

	return urlList;
};

var fetchTopic = function(html, topicRule){
	var $ = cheerio.load(html);
	var topic = {};

	topic.title = util.trim($(topicRule.title).text());
	topic.tag = util.trimAll($(topicRule.tag).text());
	topic.content = $(topicRule.content).html();

	topic.moduleId = topicRule.moduleId;
	topic.channelId = topicRule.channelId;

	return topic;
};


var getHtml = function(url, callback){
	var html = '';

	http.get(url, function(res){
		res.on('data', function(data){
			html += data;
		}).on('end', function(){
			!!callback && callback(html);
		});
	}).on('error', function(e){
		console.log('Url get error:', url);
		console.log(e);
	});
};

var run = function(){
	var articles = [];
	
	for(var websiteIndex = 0, website; website = config[websiteIndex]; websiteIndex++){
		getHtml(website.listUrl, (function(website){
			return function(html){
				var urls = fetchTopicUrlList(html, website);

				for(var urlIndex = 0, pageUrl; pageUrl = urls[urlIndex]; urlIndex++){
					getHtml(pageUrl, function(website){
						return function(html){
							var topic = fetchTopic(html, website.topicRule);
							if(!util.isEmptyObject(topic)){
								var data = '<html><head><meta charset="utf-8"></head><body><h2>'
									+ topic.title + '</h2><p>'
									+ topic.content + '</p></body></html>';
								util.writeFile(topic.title + '.html', data);
							}
						};
					}(website));
				}
			};
		})(website));
	}
};

module.exports = exports = {
	run: run
};