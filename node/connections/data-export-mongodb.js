const { MongoClient, ReadPreference } = require('mongodb');
const config = require('../config');
const format = require('util').format;
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
            
            const readPreference = 'secondary'
            // const url = format(
            //     'mongodb://%s,%s,%s/?replicaSet=%s&readPreference=%s',
            //     `${config.dbHost1}:${config.dbPort1}`,
            //     `${config.dbHost2}:${config.dbPort2}`,
            //     `${config.dbHost3}:${config.dbPort3}`,
            //     config.replicaSet,
            //     readPreference
            // );

            const url = format(
                'mongodb://%s:%s@%s,%s,%s/?authSource=admin&replicaSet=%s',
                `${config.dbUser}`,
                `${config.dbPassword}`,
                `${config.dbHost1}:${config.dbPort1}`,
                `${config.dbHost2}:${config.dbPort2}`,
                `${config.dbHost3}:${config.dbPort3}`,
                config.replicaSet
            );

            /**
             * Below approach used to connect mongodb using replica node
             */
            // const url = format(
            //     'mongodb://%s:%s@%s',
            //     `${config.dbUser}`,
            //     `${config.dbPassword}`,
            //     `${config.dbHost3}:${config.dbPort3}`
            // );
            
            return url;
            
            // return `mongodb://${config.dbHost1}:${config.dbPort1},${config.dbHost2}:${config.dbPort2},${config.dbHost2}:${config.dbPort3}/?readPreference=${readPreference}&replicaSet=${config.replicaSet}`;

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