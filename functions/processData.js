async function processData() {
    try {
      await storeDataInJson(extractedData);
      // await bulkstoreInPouchdb();
    } catch (error) {
      console.error("An error occurred:", error);
      // if (error.name === "StoreDataInJsonError") {
      //   console.error("Data could not be stored in JSON.");
      // } else if (error.name === "DiffieHellmanGroupError") {
      //   console.error("Error in DiffieHellmanGroup function.");
      // } else {
      //   console.error("Unexpected error.");
      // }
    }
  }


  module.exports = processData;