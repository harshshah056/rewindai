
const fs = require('fs');
const JSONStream = require('JSONStream');
const PouchDB = require('pouchdb');
const db = new PouchDB('activeWindows');

function bulkstoreInPouchdb() {

    const readableStream = fs.createReadStream('data.json', { encoding: 'utf-8' });
    const jsonStream = JSONStream.parse('*');
   // Array to store JSON data objects
    var jsonDataArray = [];

    readableStream.pipe(jsonStream);

    // jsonStream.on('data', (jsonDataObject) => {
    //     // Process each JSON object as it is parsed
    //     // console.log('Received JSON data:', jsonDataObject);
    //     jsonDataArray.push(jsonDataObject);
    // });
    

    jsonStream.on('data', (jsonDataObject) => {
        // Validate if jsonDataObject is a valid JSON object
        if (typeof jsonDataObject === 'object' && jsonDataObject !== null) {
          jsonDataArray.push(jsonDataObject);
        } else {
          console.warn('Invalid JSON object:', jsonDataObject);
        }
      });

    jsonStream.on('end', () => {
        console.log('Finished reading JSON file.');
        // console.log('First data object:', jsonDataArray[0]);
        console.log('Number of data objects:', jsonDataArray.length);

        // Perform bulk insert
        db.bulkDocs(jsonDataArray)
        .then((result) => {
        console.log('Bulk insert successful:', result);
        })
        .catch((error) => {
        console.error('Error during bulk insert:', error);
        });




    // //delete data.json file data
    // fs.unlink('data.json', (err) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     //file removed
    // })
        
    });

    jsonStream.on('error', (err) => {
        console.error('Error parsing JSON:', err);
    });

    readableStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });

}


module.exports = bulkstoreInPouchdb;