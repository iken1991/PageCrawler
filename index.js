var http = require('http');

http.createServer(function(req, res){
	res.writeHeader(200, {'content-type':'text/html'});
	res.end('welcome to visit nodejs site');
}).listen(80);

console.log('http://localhost has been running');