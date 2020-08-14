const format = require('util').format;
const MongoClient = require('mongodb').MongoClient;

const mongoUri = format('mongodb://%s,%s,%s/%s?replicaSet=%s',
  "172.168.3.83:27017",
  "172.168.3.83:27018",
  "172.168.3.83:27019",
  "test",
  "rs0");

console.log(mongoUri);

// const mongoUri = "mongodb://<dbUser>:<dbPassword>@<host1>:<port1>,<host2>:<port2>/<dbName>?replicaSet=<replicaSetName>";

const options = {
    server: {
        socketOptions: {
            autoReconnect: true,
            keepAlive: 1,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 0
        }
    },
    replSet: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 0
        }
    }
}

MongoClient.connect(mongoUri, options, function(err, db){
    if(err){
        console.log(err);
    } else {
        db.collections(function(err, collections) {
            collections.forEach(function(coll) {
                console.log(coll.s.name);
            });
        });
    }
});