const db = require('../db');

exports.all = (cb) => {
  db.get().collection('users').find().toArray( (error, docs) => cb(error, docs))
};

exports.findByName = (name, cb) => {
  db.get().collection('users').find({name: name}).toArray( (err, docs) => cb(err, docs))
};

exports.create = (user, cb) => {
  db.get().collection('users').insertOne(user, (err) => cb(err));
};

exports.replace = (paramsName, bodyName, cb) => {
  db.get().collection('users').updateOne({name: paramsName}, {$set: bodyName}, (err) => cb(err) );
};

exports.delete = (paramsName, cb) => {
  db.get().collection('users').removeOne({name: paramsName}, (err) => cb(err) );
};