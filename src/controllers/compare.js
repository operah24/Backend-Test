const { Submission, Result } = require('../models/');
const compareTwoStrings = require('../utils/compareStrings');

// compare two submissions
const compare = async (req, res) => {
  const { name1, name2 } = req.body;
  try {
    const firstSubmission = await Submission.findOne({ studentName: name1 });
    const secondSubmission = await Submission.findOne({ studentName: name2 });
    const comparison = compareTwoStrings(
      firstSubmission.task,
      secondSubmission.task
    );

    const result = new Result({
      firstStudent: name1,
      secondStudent: name2,
      resultDetails: (Number(comparison) * 100).toPrecision(2) + '%',
    });
    await result.save();
    return res.status(201).json({
      message: 'success',
      result,
    });
  } catch (error) {
    return res.status(500).json({
      status: error,
    });
  }
};

//get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    return res.status(200).json({
      results,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
//rerun result
const rerun = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      res.status(404).json({
        error,
        message: 'Result not found',
      });
    }
    const firstSubmission = await Submission.findOne({
      studentName: result.firstStudent,
    });
    const secondSubmission = await Submission.findOne({
      studentName: result.secondStudent,
    });
    const comparison = compareTwoStrings(
      firstSubmission.task,
      secondSubmission.task
    );
    result.resultDetails = (Number(comparison) * 100).toPrecision(2) + '%';
    await result.save();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: error,
    });
  }
};

module.exports = { compare, getAllResults, rerun };
