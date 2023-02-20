const dbValidator = require('./db-validators');
const validateJWT = require('./token');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidator,
    ...validateJWT,
    ...googleVerify,
    ...uploadFile,
}