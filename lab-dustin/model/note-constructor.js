'use strict';

exports.Note = function(note){
  this.id = note.id;
  this.date = note.date;
  this.body = note.body;
  this.user = note.user;
};
