$(function () {
  "use strict";
  // for better performance - to avoid searching in DOM

  var status = $('#status');
var errorx = $('#errorx');

  window.WebSocket = window.WebSocket || window.MozWebSocket;
  // if browser doesn't support WebSocket, just show
  // some notification and exit

  // open connection
  var connection = new WebSocket('ws://188.251.244.174:1337');
  connection.onopen = function () {
    // first we want users to enter their names
    
  };
  connection.onerror = function (error) {
    // just in there were some problems with connection...
     //errorx.text('error.message= ' + error.message + ' error.error= ' + error.error + ' error.code= ' + error.code);

  };
  // most important part - incoming messages
  connection.onmessage = function (message) {
    // try to parse JSON message. Because we know that the server
    // always returns JSON this should work without any problem but
    // we should make sure that the massage is not chunked or
    // otherwise damaged.
    // console.log('message=' + message);
    try {
      var json = JSON.parse(message.data);
      // console.log('json: ', json);
    } catch (e) {
      //console.log('Invalid JSON: ', message.data);
      return;
    }
    // NOTE: if you're not sure about the JSON structure
    // check the server source code above
    // first response from the server with user's color
    if (json.type === 'message') { // it's a single message
      // let the user write another message


    // console.log('acknowledgment= >' + json.data[0].acknowledgment);
    //console.log('whodrinks= ' + json.data[0].whodrinks);
     //console.log('namex= ' + json.data[0].namex);
     if(json.data[0].acknowledgment){
        //$("#card1").fadeIn();
      fadeInOut($("#card-text-1") , "Bitaîte/Agradecimento");
        fadeInOut($("#acknowledgment") , json.data[0].acknowledgment);
     }else{
       fadeInOut($("#card-text-1") , "");
        fadeInOut($("#acknowledgment") , "");
        //$("#card1").fadeOut();
     }
     if(json.data[0].namex){
        //$("#card3").fadeIn();
        fadeInOut($("#card-text-3") , "Quem mandou beber");
        fadeInOut($("#namex") , json.data[0].namex);

     }else{
       fadeInOut($("#card-text-3") , "");
        fadeInOut($("#namex") , "");
        //$("#card3").fadeOut();
     } 
   fadeInOut($("#card-text-2") , "Quem bebe");
    fadeInOut($("#whodrinks") , json.data[0].whodrinks);
    

    } else {
      //console.log('Hmm..., I\'ve never seen JSON like this:', json);
    }
  };

  /**
   * This method is optional. If the server wasn't able to
   * respond to the in 3 seconds then show some error message 
   * to notify the user that something is wrong.
   */
  setInterval(function() {
   
  }, 3000);


var fadeInOut = function (element, text){        
  $(element).fadeOut(1700, function () {
                 // First Animation complete                   
  setTimeout(function(){           
  $(element).fadeIn(2000, function () {        
  // Second Animation complete  
  });    
  $(element).text("" + text);    
            },100);
            // Wait for 4 Seconds before starting     
  });
};


});