
// require('dotenv').config();

const config = {
    app: process.env.APP || 'dev',
    debug: process.env.DEBUG || false,
    awsAccessKeyId: process.env.ACCESS_KEY_ID || '',
    awsSecretAccessKey: process.env.ACCESS_KEY_SECRET || '',
    awsRegion: process.env.REGION || 'us-west-2',
    queueUrl: process.env.SQS_URL || '',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '27017',
    dbHost1: process.env.DB_HOST_1 || 'localhost',
    dbPort1: process.env.DB_PORT_1 || '27017',
    dbHost2: process.env.DB_HOST_2 || 'localhost',
    dbPort2: process.env.DB_PORT_2 || '27018',
    dbHost3: process.env.DB_HOST_3 || 'localhost',
    dbPort3: process.env.DB_PORT_3 || '27019',
    replicaSet: process.env.REPLICA_NAME || 'rs0',
    dbName: process.env.DB_NAME || 'data_export',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
}
module.exports = config;