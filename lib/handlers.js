const fs = require("fs");
const _data = require("./data");
const helpers = require("./helpers");

// Handler object
var handlers = {};

// Basic Handlers
handlers.home = function(data,callback){
  callback(200,{'Message':'Welcome to The home Page'});
};

handlers.ping = function(data,callback){
  callback(200,{'Status':'App is Alive'});
};

handlers.notFound = function(data,callback){
  callback(404,{'Message':'This Route doesnot exists'});
};

// Users Route - Pubic
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  }
  else{
    callback(405);
  }
};

// Authentication Route - Public
handlers.auth = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1){
    handlers._auth[data.method](data,callback);
  }
  else{
    callback(405);
  }
}

/*************************************************
* Private functions for 'users' and 'auth' routes
*************************************************/

// Declaration
handlers._users = {};
handlers._auth = {};

// Definition
handler._users.post = function(data,callback){
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstname.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 7 ? data.payload.password.trim() : false;
  var mode = typeof(data.payload.mode) == 'string' && data.payload.mode.trim().length == 3 ? data.payload.mode.trim() : false;
  if (firstName && lastName && password && mode){
    if (mode == 'usr' || mode == 'cht'){
      
    }
    else {
      callback(405,{'Error':'Please Spcify your account-type(mode) as either "usr"(user) or "cht"(chatroom)'});
    }
  }
  else{
    callback(400,{'Error':'Missing Fields'});
  }
};


handler._users.get = function(data,callback){

};


handler._users.put = function(data,callback){

};


handler._users.delete = function(data,callback){

};











// Handler Export
module.exports = handlers;
