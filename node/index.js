const config = require('./config');
const dataExportDb = require('./connections/data-export-mongodb');
const debug = config.debug;

(async () => {
    try {
	console.log('node mongo check!')
	const db = await dataExportDb.getConnection();
        dataExportDb.closeConnection();
    } catch (error) {
	console.error(error.stack)
    } finally {
	console.log('all done')
    }
})();

