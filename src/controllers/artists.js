const Artists = require('../models/artists');

exports.all = (req, res) => {
  Artists.all( (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  })
};

exports.findByName = (req, res) => {
  Artists.findByName(req.params.name, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  })
};

exports.create = (req, res) => {
  const user = {
    name: req.body.name,
    age: req.body.age
  };
  Artists.create(user, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    res.send('Response correct!')
  })
};

exports.replace = (req, res) => {
  const paramsName = req.params.name;
  const bodyName = {
    name: req.body.name
  };
  Artists.replace(paramsName, bodyName, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    res.send('Response correct!')
  })
};

exports.delete = (req, res) => {
  const paramsName = req.params.name;
  Artists.delete(paramsName, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send('Response correct!');
  });
};