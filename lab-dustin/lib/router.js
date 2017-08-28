'use strict';

const parseUrl = require('./parse-url');
const parseJSON = require('./parse-json');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    DELETE: {}
  };
};

Router.prototype.get = function(path,callback){
  this.routes.GET[path] = callback;
};
Router.prototype.post = function(path,callback){
  this.routes.POST[path] = callback;
};
Router.prototype.delete = function(path,callback){
  this.routes.DELETE[path] = callback;
};


Router.prototype.route = function(){
  console.log('routes: ',this.routes);

  return (req,res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req)
    ])
      .then(() => {
        console.log(req.method,req.url.href);
        let methodRoutes = this.routes[req.method];
        console.log(methodRoutes);
        if (!methodRoutes) throw new Error(`I don't speak ${req.method}`);

        console.log('pathname ',req.url.pathname);

        let pathCallback = methodRoutes[req.url.pathname];
        console.log(pathCallback);
        if (typeof pathCallback === 'function') {
          return pathCallback(req, res);
        }

        res.writeHead(
          404,
          {'content-type': 'text/plain'}
        );
        res.write('Not Found');
        res.end();
      })
      .catch(err => {
        console.log(err);
        res.writeHead(
          400,
          {'content-type': 'text/plain'}
        );
        res.write(err.message);
        res.end();
      });
  };
};
