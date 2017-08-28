'use strict';

const PORT = process.env.PORT || 3000;
const fs = require('fs');
const debug = require('debug')('http');
const createError = require('http-errors');
const express = require('express');
const app = express();
const response = require('./lib/response.js');
const uuid = require('uuid');
const store = require('./lib/storage');

const storage = {};

app.post('/note',(req,res) => {
  if (!req.body) {
    res.writeHead(400);
    res.write('Bad Request');
    return res.end();
  }
  let note = Object.assign({
    id: uuid.v1(),
  },req.body);
  storage[note.id] = note;
  store.createItem('notes',note);
  console.log('note ',note);

  response.sendJSON(res,200,note);
});

app.get('/note',(req,res) => {
  let queryId = req.query.id;
  var schema = 'notes';

  console.log(queryId);
  var noteFile = store.fetchItem('notes',queryId);
  console.log(noteFile);
  if (!queryId){
    console.log(queryId);

    return response.sendText(res,400,'Bad Request');
  }
  if (!fs.existsSync(`${__dirname}/../data/${schema}/${queryId}.json`)){
    console.log(`Note ${queryId} does not exist.`);

    return response.sendText(res,404,'Not Found');
  }

  return response.sendJSON(res,200,noteFile);

});

app.delete('/note',(req,res) => {
  console.log(req.query);
  console.log('delete requested');
  response.sendText(res,204);
});


app.get('/',function(req,res){
  debug('homepage');
  response.sendText(res,200,'routed');
});
/*
//requests catch all
app.use((req,res, next) => {
  next(createError(404, 'Not Found'));
});
app.post('*',(req,res, next) => {
  next(createError(404, 'Not Found'));
});
*/
app.use(function (err, req, res, next) {
  if (err) {
    err.status !== 400 && console.error(err.stack);
    res.status(err.status).send(err.message);
  } else {
    response.sendText(404, 'Not Found');
  }
});

app.listen(PORT,function(){
  debug(`Listening on port ${PORT}`);
});

module.exports = app;
