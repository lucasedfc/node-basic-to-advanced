const { request, response } = require('express');
const ADMIN_ROLE = 'ADMIN_ROLE';

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      message: 'Error checking admin role',
    });
  }

  const { role, name } = req.user;

  if (role !== ADMIN_ROLE) {
    return res.status(403).json({
      message: `Unauthorized - this resource needs the role: ${ADMIN_ROLE}`,
    });
  }

  next();
};

const hasRole = (...roles) => {

    
  return (req = request, res = response, next) => {
    if (!roles.includes(req.user.role)) {

    
        return res.status(401).json({
          message: `Unauthorized - this resource needs at least one of these role: ${roles}`,
        });
      }

    next()
  }
};

module.exports = {
  isAdminRole,
  hasRole,
};
