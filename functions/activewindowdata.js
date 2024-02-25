const { powerMonitor } = require('electron');
const activeWin = require('active-win');

const browsers = [
    'chrome',
    'firefox',
    'safari',
    'edge',
    'opera',
    'brave',
    'vivaldi',
    'tor browser',
    'internet explorer',
    // 'explorer', // for Edge on some systems
    'chromium'
    // add more names as needed
];


async function activewindowdata() {
    return new Promise(async (resolve, reject) => {
      try {
        // const idleTime = powerMonitor.getSystemIdleTime();
        // if (idleTime <= 4) {
          const active = await activeWin();
          if (active) {
            // const activeAppName = active.owner.name.toLowerCase();
            // if (browsers.some(browser => activeAppName.includes(browser))) {
            //   console.log('Browser is active:', active.owner.name);
            //   const originalData = active;
            //   console.log(originalData);
            //   resolve(originalData);  // Resolve the promise with originalData
            //   return;  // Exit the function after resolving the promise
            // } else {
              const originalData = active;
              console.log(originalData);
  
              // // Perform asynchronous operations inside a try-catch block
              // try {
              //   // Example: await someAsyncOperation();
              //   // await Promise.all([takeScreenshot(), getexeicon(originalData.owner.path)]);
  
              //   // Commented out for illustration, replace with your actual asynchronous operations
  
              //   // Wait for 2 seconds
              //   await new Promise(resolve => setTimeout(resolve, 2000));
              // } catch (error) {
              //   console.error("Async operation error:", error);
              // }
  
              resolve(originalData);  // Resolve the promise with originalData
              return;  // Exit the function after resolving the promise
            }
          // }
        // } else {
        //   console.log(`System has been idle for ${idleTime} seconds`);
        // }
        // resolve();  // Resolve the promise with no value if idleTime > 4 or active is falsy
      } catch (error) {
        reject(error);
      }
    });
  }
  

  
module.exports = activewindowdata;