const config = require('./config');
const dataExportDb = require('./connections/data-export-mongodb');
const debug = config.debug;

(async () => {
    try {
        console.log('node mongo check!')
        const db = await dataExportDb.getConnection();
        const results = await db
            .collection('posts')
            .find({})
            .limit(1)
            .toArray();


        // // Execute ping against the server
        const pingResult = await db.command( { isMaster: 1 });
        console.log('ping: ' + JSON.stringify(pingResult));
        console.log(JSON.stringify(results));
        dataExportDb.closeConnection();
    } catch (error) {
        console.error(error.stack)
        process.exit();
    } finally {
        console.log('all done')
    }
})();