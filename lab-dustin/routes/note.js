'use strict';

const fs = require('fs');
const uuid = require('uuid');

exports.noteRoutes = function(router){
  router.get('/', function(req,res){

    response.sendText(res,200,'routed');

  });

  const storage = {};

  router.post('/note',(req,res) => {
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

  router.get('/note',(req,res) => {
    let queryId = req.url.query.id;
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

  router.delete('/note',(req,res) => {
    console.log(req.url.query);
    console.log('delete requested');
    response.sendText(res,204);
  });
};
