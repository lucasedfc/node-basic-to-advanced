const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-role');

module.exports = {
    ...validateJWT,
    ...validateRoles
}