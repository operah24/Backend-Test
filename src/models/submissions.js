const { model, Schema } = require('mongoose');

const submissionSchema = new Schema(
  {
    studentName: {
      type: String,
      unique: true,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Submission = model('Submission', submissionSchema);

module.exports = Submission;
