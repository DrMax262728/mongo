const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// mongo
const mongoUrl = "mongodb://localhost:27017";

// routes
app.get('/', (req, res) => {
  res.send('Response')
});

app.get('/users', (req, res) => {
  db.get().collection('users').find({}).toArray( (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500)
    }

    res.send(docs);
  });
});

app.post('/users', async (req, res) => {

  const user = {
    name: req.body.name,
    age: req.body.age
  };

   await db.get().collection('users').insertOne(user, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    res.send('Response correct!')
  });
});

app.get('/user/:name', (req, res) => {
  const paramsName = req.params.name;

  db.get().collection('users').find({name: paramsName}).toArray( (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  });
});

app.put('/user/:name', (req, res) => {
  const paramsName = req.params.name;
  const bodyName = {
    name: req.body.name
  };

  db.get().collection('users').updateOne({name: paramsName}, {$set: bodyName}, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    res.send('Response correct!')
  });
});

app.delete('/user/:name', (req, res) => {
  const paramsName = req.params.name;

  db.get().collection('users').removeOne({name: paramsName}, (err) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send('Response correct!');
  })
});

console.log('db: ', db);

// connect to server
  db.connect( mongoUrl,(err) => {
  if (err) {
    return console.log(err)
  }

  app.listen(3737, () => {
    console.log('Server started!')
  });

});