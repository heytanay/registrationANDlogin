// Dependencies
const http = require("http");
const fs = require("fs");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");

// Libs
const handlers = require("lib/handlers");

const server = http.createServer(function(req,res){
  // Get all the informations provided by the reuqester
  var method = req.method.toLowerCase();
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;

  // Trim the Path
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the Query String
  var queryString = parsedUrl.query;

  var headers = req.headers;

  var buffer = '';
  var decoder = new StringDecoder('utf-8');
  req.on('data',function(data){
    buffer += decoder.write(data);
  });

  req.on('end',function(){
    buffer += decoder.end();

    // Get the Handler from Trimmed Path and check if it is one of the routes present in the 'router' object
    var handler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct a Data object to send through
    var data = {
      'path': trimmedPath,
      'method': method,
      'headers': headers,
      'query': queryString,
      'payload': helpers.parseJSONToObject(buffer)
    };

    // Call the Specific Handler
    handler(data,function(statusCode,payload){

      // Check the Intergrity of the statusCode and payload being sent through
      var status = typeof(statusCode) == 'number' ? statusCode : 200;
      var payload = typeof(payload) == 'object' ? payload : {};

      var payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type','application/json');
      res.writeHead(status);
      res.end(payloadString);

      console.log('Got this Response: ',status,payloadString);
    });
  });
});


server.listen(3000,function(){
  console.log("Server Active");
});

var router = {
  "home": handler.home,
  "ping": handler.ping,
  "users": handler.users,
  "auth": handler.auth,
};
