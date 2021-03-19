const mongoose = require("mongoose");
const User = require("./user");
const Submission = require("./submissions");
const Result = require("./result");


const connectDatabase = async() =>{
  const url = process.env.MY_DATABASE_URL;
  try {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(()=> console.log("connected to database"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDatabase, User, Submission, Result }