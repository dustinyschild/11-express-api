'use strict';

const PORT = process.env.PORT;
const createError = require('http-errors');
const express = require('express');
const app = express();

app.get('/',function(req,res){
  res.send('Hello World');
});

app.listen(PORT,function(){
  console.log(`Listening on Port ${PORT}`)
});
