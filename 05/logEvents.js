const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        // testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = logEvents;
//console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
//console.log(uuidv4());
