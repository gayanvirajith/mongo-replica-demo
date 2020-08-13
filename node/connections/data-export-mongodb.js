const { MongoClient, ReadPreference } = require('mongodb');
const config = require('../config');

class DataExport {
    constructor() {
        this.connectionString = this.getConnectionUrl();
	console.log(this.connectionString);
    }

    closeConnection() {
        if (this.db && this.client) {
            this.client.close();
            this.db = undefined;
            this.client = undefined;
        }
    }

    async getConnection() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                return resolve(this.db);
            }
            const oldOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                readPreference: ReadPreference.SECONDARY_PREFERRED
            };
            // Use connect method to connect to the Server
            MongoClient.connect(
                this.connectionString, oldOptions,
                (err, client) => {
                    if (err) {
                        return reject(err);
                    } else {
                        this.client = client;
                        this.db = client.db(config.dbName);
                        return resolve(this.db);
                    }
                }
            );
        });
    }

    getConnectionUrl() {
        if (config.app == 'dev') {
            return `mongodb://${config.dbHost1}:${config.dbPort1},${config.dbHost2}:${config.dbPort2},${config.dbHost2}:${config.dbPort3}/?w=0&readPreference=primary`;
        } else {
            const connectionString = 'mongodb://' +
                config.dbUser +
                ':' +
                config.dbPassword +
                '@' +
                config.dbHost1 +
                ':' +
                config.dbPort1 +
                '/?authSource=admin'
            return connectionString;
        }
    }
}

module.exports = new DataExport();
