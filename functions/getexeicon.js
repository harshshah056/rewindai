const path = require('path');
const iconExtractor = require('icon-extractor');
const PouchDB = require('pouchdb');
const icondb = new PouchDB('icondb');

async function getexeicon(exepath) {
    return new Promise(async (resolve, reject) => {
    var exeFilePath = exepath;
    var exename = path.basename(exeFilePath);
    // extractedData.exename = exename;
    var doc;

    // Check if the document with the given exename already exists in the database
    try {
        doc = await icondb.get(exename);

        // If the document exists, update the counter value
        doc.counter = (doc.counter) + 1;

        // Save the updated document to the PouchDB database
        try {
            const response = await icondb.put(doc);
            console.log('Document updated successfully:', response);
            resolve();
            return;
        } catch (error) {
            console.error('Error updating document:', error);
            reject();
        }
        // console.log('Document retrieved:', doc);
    } catch (error) {
        // If the document doesn't exist (not_found), create a new one
        if (error.name === 'not_found') {
            // Use a Promise to handle the asynchronous icon extraction
            const iconPromise = new Promise((resolve, reject) => {
                iconExtractor.emitter.on('icon', function (data) {
                    const icon = data.Base64ImageData;
                    resolve(icon);
                });

                iconExtractor.emitter.on('error', function (err) {
                    reject(err);
                });

                iconExtractor.getIcon('ANY_TEXT', exeFilePath);
            });

            try {
                // Wait for the iconPromise to resolve
                const icon = await iconPromise;

                // Decode base64 image data
                const decodedImageData = Buffer.from(icon, 'base64');

                // Attach the decoded image data as a PNG attachment
                doc = {
                    _id: exename,
                    exename: exename,
                    counter: 1, // Initialize counter to 1 for new documents
                    _attachments: {
                        'image.png': {
                            content_type: 'image/png',
                            data: decodedImageData,
                        },
                    },
                };

                // Save the new document to the PouchDB database
                await icondb.put(doc);
                console.log('New document saved successfully');
                resolve();
                return;
            } catch (error) {
                console.error('Error:', error);
                reject();

            }
        } else {
            console.error('Error:', error);
            reject();
        }
    }

    if (doc) {
        // If the document exists or was created, you can perform additional actions here
        console.log('Document retrieved or created:', doc);
        // getDocWithAttachments(doc._id); // Assuming _id is a valid identifier
    }
});
}


module.exports = getexeicon;