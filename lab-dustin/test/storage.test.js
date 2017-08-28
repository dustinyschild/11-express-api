'use strict';

var chaifs = require('chai');
chaifs.use(require('chai-fs'));

var chaistring = require('chai');
chaistring.use(require('chai-string'));

const { expect } = require('chai');
require('chai-fs');
const storage = require('../lib/storage');

describe('storage',function(){
  const schemaName = 'people';
  const itemToSave = { id: 12, name: 'Dustin' };

  describe('createItem()',function(){
    it('should save item',function(done){
      storage.createItem(schemaName,itemToSave)
        .then(saveItem => {
          expect(saveItem).to.deep.equal(itemToSave);
          done();
        });
    });

  });
  describe('fetchItem()',function(){
    it('should fetch item',function(done){
      storage.fetchItem(schemaName,itemToSave.id)
        .then(fetchedItem => {
          expect(fetchedItem).to.deep.equal(itemToSave);
          done();
        })
        .catch(done);
    });
    it('should fail given missing schema',function(done){
      storage.fetchItem('missing',itemToSave.id)
        .catch(err => {
          expect(err).to.not.be.null;
          done();
        });
    });
  });
  const itemToDelete = itemToSave;
  const deletedItem = '../data/people/12.json';
  describe('deleteItem()',function(){
    it('should not contain the note',function(done){
      storage.deleteItem(schemaName,itemToDelete.id)
        .then(returnItem => {
          console.log(deletedItem);
          expect(returnItem).to.endsWith(deletedItem);
          expect(deletedItem).to.not.be.a.path();
          done();
        });
    });
  });
});
