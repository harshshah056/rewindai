const { desktopCapturer } = require('electron');
const fs = require('fs');
const { resolve } = require('path');
async function takeScreenshot() {
    return new Promise(async (resolve, reject) => {
    try {
        const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } });
        const screen = sources.find((source) => source.name === 'Entire screen');
        var filename = "";
        if (screen) {
            const thumbnail = screen.thumbnail.toPNG();
            console.log("thumbnail", thumbnail);



            // Generate a unique filename
            const timestamp = new Date().getTime();
            filename = `thumbnail_${timestamp}.png`;
            if (!filename || filename.trim() === '') {
                console.error('Error: Filename is empty or not defined');
              } 

            // Get the temporary directory path
            // const tempDir = os.tmpdir();

            // Create the full file path
            const filePath = './temp/' + filename;

            // Check if the temp directory exists, and create it if it doesn't
            if (!fs.existsSync("./temp")) {
                await fs.mkdirSync("./temp");
                // Save the thumbnail data to the temporary file
                await fs.writeFileSync(filePath, thumbnail);

                console.log(`Thumbnail saved: ${filePath}`);
                // extractedData.imgname = filename;
                // extractedData.time = new Date().toISOString();
                // ocr(filePath);
                // compress(filePath);
                
            } else {
                // Save the thumbnail data to the temporary file
                await fs.writeFileSync(filePath, thumbnail);

                console.log(`Thumbnail saved: ${filePath}`);
                // extractedData.imgname = filename;
                // extractedData.time = new Date().toISOString();
                // ocr(filePath);
                // compress(filePath);
                


            }

        }
        resolve(filename);
    } catch (error) {
        console.error('Error capturing and saving screenshot:', error);
        reject(error);
    }
})
}


module.exports = takeScreenshot;