const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-role');
const validateFile = require('./validate-file');

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}