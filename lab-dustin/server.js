'use strict';

const PORT = process.env.PORT;
const debug = require('debug')('http');
const createError = require('http-errors');
const express = require('express');
const app = express();
const response = require('./lib/response.js');

app.get('/',function(req,res){
  response.sendText(res,200,'routed');
});

app.get('/notes',function(req,res){
  debug('getting notes');
  res.send('your notes');
});

//requests catch all
app.get('*',(req,res) => {
  res.send(createError(404, 'Not Found'));
});

app.post('*',(req,res) => {
  res.send(createError(404, 'Not Found'));
});

app.listen(PORT,function(){
  debug(`Listening on port ${PORT}`);
});

module.exports = app;
