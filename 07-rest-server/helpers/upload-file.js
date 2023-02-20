const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
    
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        if(!validExtensions.includes(file.mimetype)) {

            return reject(`Invalid extension, upload one of this extension: ${validExtensions}`)
            
        }
    
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
      
        file.mv(uploadPath, function(err) {
          if (err) {
            reject(err)
          }
          
          resolve(tempName);
        });
        
    })


}

module.exports = {
    uploadFile
}