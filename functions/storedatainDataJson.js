// const fs = require('fs');


// async function storedatainDataJson(extractedData) {

//     filePath = "./data.json"

//     let existingData = [];

//     // Read existing data asynchronously without blocking the event loop
//     try {
//         const fileContent = fs.readFileSync(filePath, 'utf-8');
//         existingData = JSON.parse(fileContent).existingData || [];
//     } catch (error) {
//         // Handle the error, e.g., file not found or not valid JSON
//         console.error(`Error reading JSON file: ${error.message}`);
//     }

//     // Add new data to the array
//     const newData = { extractedData };
//     const updatedData = { existingData: [...existingData, newData] };

//     // Write the combined data back to the file
//     try {
//         fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
//         console.log('Active data appended to JSON file:', filePath);
//     } catch (writeError) {
//         // Handle the error during file write
//         console.error(`Error writing to file: ${writeError.message}`);
//     }

// }



















const fs = require('fs');

async function storedatainDataJson(extractedData) {
  const filePath = "./data.json";

  let existingData = [];

  // Read existing data asynchronously without blocking the event loop
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    existingData = JSON.parse(fileContent) || [];
    // console.log('Existing data read from JSON file:', existingData);
  } catch (error) {
    // Handle the error, e.g., file not found or not valid JSON
    console.error(`Error reading JSON file: ${error.message}`);
  }

  // Add new data to the array
  existingData.push(extractedData);

  // Write the combined data back to the file
  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    // console.log('Active data appended to JSON file:', filePath);
  } catch (writeError) {
    // Handle the error during file write
    console.error(`Error writing to file: ${writeError.message}`);
  }
}








// async function storedatainDataJson(extractedData) {
//     const filePath = "./data.json";

//     // Create a readable stream to read existing data
//     const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

//     // Create a writable stream to write updated data
//     const writeStream = fs.createWriteStream(filePath, { encoding: 'utf-8', flags: 'a' });

//     // Handle stream events
//     readStream.on('error', (error) => {
//         console.error(`Error reading JSON file: ${error.message}`);
//     });

//     writeStream.on('error', (error) => {
//         console.error(`Error writing to file: ${error.message}`);
//     });

//     writeStream.on('finish', () => {
//         console.log('Active data appended to JSON file:', filePath);
//     });

//     // Read existing data and append new data
//     let existingData = [];
//     let fileContent = '';

//     readStream.on('data', (chunk) => {
//         fileContent += chunk;
//     });

//     readStream.on('end', () => {
//         existingData = JSON.parse(fileContent).existingData || [];
//         const newData = { extractedData };
//         const updatedData = { existingData: [...existingData, newData] };

//         // Write the combined data back to the file
//         writeStream.write(JSON.stringify(updatedData, null, 2));
//         writeStream.end();
//     });

// }








// const fs = require('fs');
// const readline = require('readline');
// const stream = require('stream');

// async function storedatainDataJson(extractedData) {
//   const filePath = './data.json';

//   // Create a readable stream to read the existing data
//   const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

//   // Create a transform stream to parse and modify the data
//   const transformStream = new stream.Transform({
//     objectMode: true,
//     transform(chunk, encoding, callback) {
//       try {
//         const existingData = JSON.parse(chunk).existingData || [];
//         const newData = { extractedData };
//         const updatedData = { existingData: [...existingData, newData] };
//         const updatedChunk = JSON.stringify(updatedData, null, 2);
//         this.push(updatedChunk);
//         callback();
//       } catch (error) {
//         callback(error);
//       }
//     }
//   });

// //   // Create a writable stream to write the updated data back to the file
// //   const writableStream = fs.createWriteStream(filePath);

// //   // Pipe the streams together to process data in a streaming fashion
// //   readableStream
// //     .pipe(new stream.Split())
// //     .pipe(transformStream)
// //     .pipe(writableStream);

//   // Handle errors during the stream processing
//   readableStream.on('error', (error) => {
//     console.error(`Error reading JSON file: ${error.message}`);
//   });

// //   writableStream.on('error', (error) => {
// //     console.error(`Error writing to file: ${error.message}`);
// //   });

// //   writableStream.on('finish', () => {
// //     console.log('Active data appended to JSON file:', filePath);
// //   });
// }





module.exports = storedatainDataJson;
