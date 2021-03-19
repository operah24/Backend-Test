const {model, Schema} = require("mongoose");

const resultSchema = new Schema(
    {
        firstStudent:{
            type: String,
            required: true,
        },
        secondStudent:{
            type: String,
            required: true,
        },
        resultDetails:{
            type: String,
            required: true
        },
    },
    { timestamps: true }
);
const Result = model("Result", resultSchema);

module.exports = Result;