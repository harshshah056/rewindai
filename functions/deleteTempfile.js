const fs = require('fs');
// const path = require('path');
//delete temp file
// const tempFolderPath = '/path/to/temp/folder';
// const imageName = 'image.jpg';

// tempFolderPath = '../temp';

// const imagePath = path.join(tempFolderPath, imageName);


function deleteTempfile(imagePath) {
    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Image deleted successfully');
        });
    } else {
        console.log('File does not exist');
    }
};


module.exports = deleteTempfile;