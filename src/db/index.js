const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = async (url, done) => {
  if (state.db) {
    return done();
  }

  const client = new MongoClient(url, { useUnifiedTopology: true });

  await client.connect( (err, db) => {
    if (err) {
      return done(err)
    }

    state.db = client.db('mongo-express-test');
    done();
  })
};

exports.get = () => state.db;