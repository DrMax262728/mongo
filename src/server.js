const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const ArtistsController = require('./controllers/artists');

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

app.get('/users', ArtistsController.all);

app.post('/users', ArtistsController.create);

app.get('/user/:name', ArtistsController.findByName);

app.put('/user/:name', ArtistsController.replace);

app.delete('/user/:name', ArtistsController.delete);

// connect to server
  db.connect( mongoUrl,(err) => {
  if (err) {
    return console.log(err)
  }

  app.listen(3737, () => {
    console.log('Server started!')
  });

});