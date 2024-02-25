
const Tesseract = require('tesseract.js');

async function ocr(filepath) {
    return new Promise(async (resolve, reject) => {

    Tesseract.recognize(
        filepath, // Replace with the path to your image
        'eng', // Language
        { logger: progress => console.log("progress is running") } // Optional progress callback
    )
        .then(({ data: { text } }) => {
            var ocrtext = text.replace(/\n/g, ' ');
            // console.log(ocrtext);
            // extractedData.ocr = ocrtext;
            if(ocrtext){
                resolve(ocrtext);
                return;
                // storedatainDataJson(extractedData);
                // ocrtext = "";
                // extractedData = {};
            }

        })
        .catch(err => {
            console.error('Error during OCR:', err);
            reject("error in ocr", err)
        });
    })

}

// const { OcrEngine } = require('windows-media-ocr');
// const { StorageFile } = require('windows-storage');

// async function ocr(filepath) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const file = await StorageFile.getFileFromApplicationUriAsync(new Uri(filepath));
//             const stream = await file.openAsync(Windows.Storage.FileAccessMode.read);
//             const decoder = await Windows.Graphics.Imaging.BitmapDecoder.createAsync(stream);
//             const softwareBitmap = await decoder.getSoftwareBitmapAsync();

//             const ocrEngine = OcrEngine.tryCreateFromUserProfileLanguages();
//             const ocrResult = await ocrEngine.recognizeAsync(softwareBitmap);

//             resolve(ocrResult.text);
//         } catch (err) {
//             console.error('Error during OCR:', err);
//             reject("error in ocr", err);
//         }
//     });
// }

// // module.exports = ocr;

module.exports = ocr;