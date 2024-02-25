
const fs = require('fs');
const sharp = require('sharp');

async function compress(filepath) {
    return new Promise(async (resolve, reject) => {

    // try {
    if (!fs.existsSync("./screenshots")) {
        await fs.mkdirSync("./screenshots");


        sharp(filepath) // Replace with your image path
            .metadata()
            .then(metadata => {

              
                filename = dynaminame.replace('./temp/', '');
                console.log(filename);
                // Check if the temp directory exists, and create it if it doesn't


                return sharp(filepath)
                    .extract({ left: 0, top: 0, width: metadata.width, height: 1020 }) // Crop the image to 1920x1020
                    .jpeg({ quality: 40 }) // Compress the image to 40% quality
                    .toFile(`./screenshots/${filepath.replace('./temp/', '')}`); // Output compressed image
            })
            .then(() => {
                console.log('Image cropping and compression complete.')
                resolve();
                return;
            })

            .catch(err => {
                console.error('Error during cropping and compression:', err);
                reject();
            });

    } else {


        sharp(filepath) // Replace with your image path
            .metadata()
            .then(metadata => {

                var dynaminame = filepath;
                console.log(dynaminame);
                dynaminame = dynaminame.replace('./temp/', '');
                console.log(dynaminame);
                // Check if the temp directory exists, and create it if it doesn't


                return sharp(filepath)
                    .extract({ left: 0, top: 0, width: metadata.width, height: 1020 }) // Crop the image to 1920x1020
                    .jpeg({ quality: 40 }) // Compress the image to 40% quality
                    .toFile(`./screenshots/${filepath.replace('./temp/', '')}`); // Output compressed image
            })
            .then(() => {
                console.log('Image cropping and compression complete.')
                resolve();
                return;
            })

            .catch(err => {
                console.error('Error during cropping and compression:', err);
                reject();
            });
    }
});
}


module.exports = compress;