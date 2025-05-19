const { v4: uuidv4 } = require('uuid');
exports.generateToken = () => uuidv4();