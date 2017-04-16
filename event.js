var events = require('events');

var life = new events.EventEmitter();

life.setMaxListeners(20);

life.on('share', function(name){
	console.log(name + ' is sharing ~');
});

life.emit('share', 'zhtest');


/*
notes
require('events')
var left = require('events').EventEmitter();
life has limit of events bound to it
but you can use setMaxListeners to reset the limits

left.on('eventName', function(para){
	
});

life.emit('eventName');
*/