const { app, BrowserWindow, ipcMain, powerMonitor, desktopCapturer } = require('electron')
const activeWin = require('active-win');
const PouchDB = require('pouchdb');
const path = require('path');
const Tesseract = require('tesseract.js');
// const tesseract = require("node-tesseract-ocr")
// import { getIcon } from 'icon-extractor-win';
// const fileIcon = require("extract-file-icon");
const iconExtractor = require('icon-extractor');
const JSONStream = require('JSONStream');
var fs = require('fs');
const sharp = require('sharp');
const activewindowdata = require('./functions/activewindowdata');
const  takeScreenshot = require('./functions/takescreenshot');
const getexeicon = require('./functions/getexeicon');
const ocr = require('./functions/ocr');
const compress = require('./functions/compress')
const storedatainDataJson = require('./functions/storedatainDataJson')
const bulkstoreInPouchdb = require('./functions/bulkstoreInPouchdb');
const deleteTempfile = require('./functions/deleteTempfile');
const { Console, log } = require('console');
const { Index, Document, Worker } = require("flexsearch");


var server;

var extractedData = {};

const options = {
    encode: "extra",
    tokenize: "full",
    threshold: 1,
    resolution: 3,
    depth: 3
  };

const index = new Index(options);
const document = new Document(options);
const worker = new Worker(options);


const db = new PouchDB('activeWindows');
const icondb = new PouchDB('icondb');



async function createWindow() {


    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // turn off nodeIntegration
            contextIsolation: true, // turn on contextIsolation
            preload: path.join(__dirname, 'preload.js') // use a preload script
        }
    })

    win.loadFile('index.html')

    win.webContents.openDevTools()
   
    
}



// function mainfunction(){
//     const idleTime = powerMonitor.getSystemIdleTime();
//     if (idleTime <= 4) {
//         activewindowdata().then(ativedata => {
//             console.log("Promise resolved!");
//             console.log(ativedata);
//             mainfunction();
//           })
//             .catch(error => console.error("Promise rejected!", error));
            
//     }
//     else {
//         console.log(`System has been idle for ${idleTime} seconds`);
//         mainfunction();
//     }
// }



// const MAX_RECURSION_DEPTH = 1000; // Adjust this value based on your needs

// function mainfunction(recursionDepth = 0) {
//     const idleTime = powerMonitor.getSystemIdleTime();

//     if (idleTime <= 4 && recursionDepth < MAX_RECURSION_DEPTH) {
//         activewindowdata()
//             .then(ativedata => {
//                 console.log("Promise resolved!");
//                 console.log(ativedata);
//                 mainfunction(recursionDepth + 1);
//             })
//             .catch(error => console.error("Promise rejected!", error));
//     } else {
//         console.log(`System has been idle for ${idleTime} seconds`);
//         // Optionally, you can add a delay before making the next recursive call
//         setTimeout(() => mainfunction(recursionDepth + 1), 1000);
//     }
// }


app.whenReady().then(async () => {


    createWindow();
   
   
        async function mainfunction(){
            console.log("new main function stated");
    // setInterval(async () => {
        const idleTime = powerMonitor.getSystemIdleTime();
        if (idleTime <= 4) {
            activewindowdata().then(ativedata => {
                console.log("activewindowdata Promise resolved!");
                console.log(ativedata);
                extractedData.title = ativedata.title;
                extractedData.path = ativedata.owner.path;
                extractedData.name = ativedata.owner.name;

                takeScreenshot().then(filename => {
                    console.log("takeScreenshot Promise resolved!");
                    console.log(filename);
                    extractedData.imgname = filename;
                    extractedData._id = filename.replace("thumbnail_", "").replace(".png", "");;
                    extractedData.time = new Date().toISOString();

                    Promise.all([ compress(`./temp/${filename}`), getexeicon(ativedata.owner.path), 
                     ocr(`./temp/${filename}`)
                    ]).then(([compressResult, getexeiconResult, ocrResult]) => {
                        console.log("ocr Promise resolved!");
                        console.log(ocrResult);
                        extractedData.ocr = ocrResult;
                        console.log("Promise.all Promise resolved!");
                        console.log("all done");
                        if(extractedData.ocr){
                            index.add(extractedData.id, extractedData.ocr);
                              console.log("extractedData", extractedData);

                          try {
                              storedatainDataJson(extractedData);
                              deleteTempfile(`./temp/${filename}`)
                            //   storedatainDataJson(extractedData);
                            //   bulkstoreInPouchdb();
                            setTimeout(() => mainfunction(), 2000);

                              
                              
                          } catch (error) {
                            console.log("data have not stored in json",error)
                          }
                            // db.put(extractedData).then(function (response) {
                            //     console.log("db.put Promise resolved!");
                            //     console.log(response);
                            //     // handle response
                            // }).catch(function (err) {
                            //     console.log("db.put Promise rejected!");
                            //     console.log(err);
                            //     // console.log(err);
                            // });
                        }
         
                    }).catch(error => console.error("Promise.all Promise rejected!", error));


                    // ocr(`./temp/${filename}`).then((ocrtext) => {
                    //     console.log("ocr Promise resolved!");
                    //     console.log(ocrtext)
                    // }).catch(error => console.error("ocr Promise rejected!", error));

                    
                    // ocr(`./temp/${filename}`).then((ocrtext) => {
                    //     console.log("ocr Promise resolved!");
                    //     console.log(ocrtext)
                    //     extractedData.ocr = ocrtext;
                    // }).catch(error => console.error("ocr Promise rejected!", error));

                        
                  }).catch(error => console.error("takeScreenshot Promise rejected!", error));
              })
                .catch(error => console.error("activewindowdata Promise rejected!", error));
                
        }
        else {  
            try {
                console.log(`System has been idle for ${idleTime} seconds`);
                //bulk insert data in pouchdb of data.json file and delete data.json file
                setTimeout(() => mainfunction(), 5000);
            } catch (error) {
                console.log("idle error", error)
            }
         
            

        }
    // }, 5000);
}

mainfunction();

    
});




app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})