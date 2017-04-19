var config = [
    {
        website: 'http://www.jiqizhixin.com',
        listUrl: 'http://www.jiqizhixin.com/edge',
        target: '.blog-header>h2>a',
        targetAttribute: 'href',
        isAbs: false,
        topicRule: {
            title: 'h2.al-article-title',
            date: '.am-fl', //$('.am-fl').text().replace(/\s\s+/g, '').substring(0, 19);
            tag: '.al-article-tag',
            content: '.al-article-content'
        }
    }, {
        website: 'http://www.leiphone.com',
        listUrl: 'http://www.leiphone.com/category/ai',
        target: '.word>h3>a',
        targetAttribute: 'href',
        isAbs: true,
        topicRule: {
            title: 'h1.headTit',
            date: '.msg .time',
            tag: '',
            content: '.lph-article-comView'
        }
    }
];

module.exports = exports = config;