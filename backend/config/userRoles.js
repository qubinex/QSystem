var userRolesConfig = module.exports;

var roles = userRolesConfig.userRoles = {
  guest: 1,         // ...000000001
  student: 2,       // ...000000010
  reserved3: 4,     // ...000000100
  reserved2: 8,     // ...000001000
  reserved1: 16,    // ...000010000
  instructor: 32,   // ...000100000
  officeAdmin: 64,  // ...001000000
  manager: 128,     // ...010000000
  portalOwner: 256, // ...100000000
};

userRolesConfig.accessLevels = {
  guest: roles.guest | roles.student | roles.reserved3 | roles.reserved2 | roles.reserved1 | roles.instructor | roles.officeAdmin | roles.manager | roles.portalOwner,
  student: roles.student | roles.reserved3 | roles.reserved2 | roles.reserved1 | roles.instructor | roles.officeAdmin | roles.manager | roles.portalOwner,
  instructor: roles.instructor | roles.manager | roles.portalOwner,
  officeAdmin: roles.officeAdmin | roles.manager | roles.portalOwner,
  manager: roles.manager | roles.portalOwner,
  portalOwner: roles.portalOwner,
};