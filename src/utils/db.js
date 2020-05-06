const mongoose = require("mongoose");

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb://Yueer:ZNqxEyOGbyXTe82E@cluster0-shard-00-00-dvncc.mongodb.net:27017,cluster0-shard-00-01-dvncc.mongodb.net:27017,cluster0-shard-00-02-dvncc.mongodb.net:27017/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }

  console.log(connectionString);
  mongoose.set("useFindAndModify", false);
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};
