var path = require('path');
var fs = require('fs');

var trim = function(str){
    return !!str? str.replace(/^\s+|\s+$/g, ''): '';
};

var trimAll = function(str){
    return !!str? str.replace(/^\s+|\s+$/g, '').replace(/\s\s+/g, ' '): '';
};

var isEmptyObject = function(obj){
    if(obj instanceof Array){
        return obj.length === 0? true: false;
    }
    for(var i in obj){
        return false;
    }
    return true;
};

var writeFile = function(fileName, data){
    if(arguments.length === 1){
        data = fileName;
        fileName = new Date().getTime() + '.txt';
    }

    fs.writeFile(__dirname + '/data/' + fileName, data, function(){
        console.log('write file:', fileName);
    });
};

module.exports = exports = {
    trim: trim,
    trimAll: trimAll,
    isEmptyObject: isEmptyObject,
    
    writeFile: writeFile
};