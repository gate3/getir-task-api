const mongoose = require('mongoose');
const debug = require('debug')('getir:server');
const {databaseUrl} = require('./env-vars');

const databaseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useUnifiedTopology: true,
  retryWrites: false,
  replicaSet: 'rs'
};

module.exports = async () => {
  try{
    await mongoose.connect(databaseUrl, databaseConnectionOptions);
    debug('Database connection successful');
  }catch(e){
    // If an error occurs, exit app process
    debug('Database connection failed with error', e);
    process.exit(1);
  }
};
