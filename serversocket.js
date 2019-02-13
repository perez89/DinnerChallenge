"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var express = require('express')
var app = express()
app.set('view engine', 'ejs');

app.use(express.json());

var db = require('./database.js');

console.log(db);

var timechange = 10000;


/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];
/**
 * Helper function for escaping input strings
 */

var options = {
  host: 'localhost',
  port: webSocketsServerPort,
  path: '/chat.html'
};


function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange', 'lim', 'slice' ];
// ... in random order
colors.sort(function(a,b) { 
	return Math.random() > 0.5; } );
/**
 * HTTP server
 */

var fruits = ["Banana", "Orange", "Apple", "Mango"];

var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server

 // console.log((new Date()) + ' HTTP server. URL'
   //   + request.url + ' requested.');

});



app.use(express.static(__dirname + ''));

app.get('/', function(req, res) {
	
	res.render('sendtask');
});

app.get('/index', function(req, res) {
	res.render('sendtask');	
});

app.get('/dontgetmewrong', function(req, res) {
	// console.log(">>>dinner<<<");

	res.render('index');
	
 	
});
/*
app.get('/changetime/:time', function(req, res){
  //res.send('time: ' + req.params.time);
 var parsed = parseInt(req.params.time);


  if (!isNaN(parsed)) { 
  	 if(parsed>5000)
  	  	timechange = parsed;
  }

  console.log(timechange);
res.send("" + timechange);
});*/


app.post('/dinner', function(req, res){
    //console.log('POST /');
 
     var obj = {};
	//console.log('body: ' + JSON.stringify(req.body));

	db.insertOnDB(req.body, function(result) {
		if(result){
			// console.log(">>>200<<<");
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('success');
		}else{
			// console.log(">>>500<<<");
			res.writeHead(500, {'Content-Type': 'text/html'});
			res.end('error');
		}
			
		});


	
	

  

   // var obj = {};

//	res.send(req.body);
});


app.listen('3000');




server.listen(webSocketsServerPort, function() {
 
});

 http.get(options, function(res) {
 // console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
 // console.log("Got error: " + e.message);
});




/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
   maxReceivedFrameSize: 131072,
            maxReceivedMessageSize: 10 * 1024 * 1024,
  httpServer: server
  ,requestLoop
});
// This callback function is called every time someone
// tries to connect to the WebSocket server

var collectionSize = 0;

var currentTask;


var requestLoop = setInterval(function(){
	
		db.getCollectionSizeDB(function(response) {
			//console.log("response= " + response);
		    collectionSize = response;
		   	var pos = Math.floor(Math.random() * (collectionSize-1))+1;
			//console.log("pos =" + pos);

			db.selectFromDB(pos, function(task) {
			currentTask = task;
			//console.log("currentTask= " + task);
			var json = JSON.stringify({ type:'message', data: currentTask });
//console.log("json= " + json);
			for (var i=0; i < clients.length; i++) {
			//console.log("log= " + json);
				clients[i].sendUTF(json);
	        }
		}
		);	

		});		
}, timechange);



wsServer.on('request', function(request) {
 // console.log((new Date()) + ' Connection from origin '
   //   + request.origin + '.');
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;

  //console.log((new Date()) + ' Connection accepted.');
 


 var json = JSON.stringify({ type:'message', data: currentTask });
	connection.sendUTF(json);

  // user sent some message
 
  // user disconnected
  connection.on('close', function(connection) {
   
     
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
  
    
  });

});