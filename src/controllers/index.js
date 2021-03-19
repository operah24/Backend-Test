const { registerUser, login} = require("./user");
const {uploadFile, getFileById} = require("./file");
const {compare} = require("./compare");

module.exports = { registerUser, login, uploadFile, getFileById, compare }