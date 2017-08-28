'use strict';

module.exports = function(req){
  if (req.method !== 'POST' && req.method !== 'PUT'){
    return Promise.resolve(req);
  }

  if (req.headers['content-type'] !== 'application/json'){
    return Promise.resolve(req);
  }

  return new Promise(function(resolve,reject){
    var body = '';
    req.on('data', function(data){
      body += data.toString();
    });
    req.on('error', function(err){
      console.log(err);
      reject(err);
    });

    req.on('end',function(){
      try{
        req.body = JSON.parse(body);
        resolve(req);
        console.log('request body',req.body);
      } catch (err){
        console.log(err);
        reject(err);
      }
    });
  });
};
