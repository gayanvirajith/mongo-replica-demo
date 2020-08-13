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
	console.log(JSON.stringify(results));
        dataExportDb.closeConnection();
    } catch (error) {
	console.error(error.stack)
    } finally {
	console.log('all done')
    }
})();

