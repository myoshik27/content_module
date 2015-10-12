var http = require('http');
var fs = require('fs');
var url = require('url');

module.exports = function(request,response){
	console.log('Request', request.url);
	var pathname = url.parse(request.url).pathname; //grabs url after localhost:5000
	var arr = pathname.split('.');
	console.log(arr);
		if(arr[0] === '/' && arr.length === 1){
			console.log("entered /");
			arr[0] = 'index';
		}
	var filetype = arr[arr.length-1];
	console.log("filetype: " + filetype);
	console.log("pathname: " + pathname);
	var folder;
	var content_type;
	var utf;

	switch(filetype){
		case 'index':
			console.log("entered index");
			folder = './views';
			pathname = '/index.html'
			content_type = 'text/html';
			utf = 'utf8';
			break;
		case 'html':
			folder = './views';
			content_type = 'text/html';
			utf = 'utf8';
			break;
		case 'css':
			folder = ".";
			content_type: 'text/css';
			utf = 'utf8';
			break;
		case 'jpeg':
			folder = './images';
			content_type: 'image/jpeg';
			utf = null;
			break;
		case 'png':
			folder = './images';
			content_type: 'image/png';
			utf = null;
			break;
		case 'jpg':
			folder = './images';
			content_type: 'image/jpg';
			utf = null;
			break;			
	}
	console.log(folder + pathname);
		fs.readFile(folder + pathname, utf, function (errors, contents){
			if(errors){
				console.log(errors);
				response.writeHead(404);
				response.end('File not Found!!!');	
			}else{
				response.writeHead(200, {'Content-type': content_type})
				response.write(contents); 
				response.end();
			}
		});
}