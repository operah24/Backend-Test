const { registerUser, login} = require("./user");
const {uploadFile, getFileById} = require("./file");
const compare = require("./compare");
const result = require("./result");

module.exports = { registerUser, login, uploadFile, getFileById, compare, result }