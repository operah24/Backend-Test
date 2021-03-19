const multer = require('multer');
const { Submission } = require('../models/');


const storage = multer.memoryStorage();
const multerUpload = multer({ storage: storage }).single('file');

const uploadFile = async (req, res, next) => {
  try {
    multerUpload(req, res, async (error) => {
      if (error) {
        throw new Error(error);
      }
      const fileContent = req.file.buffer.toString('utf-8');

      const newSub = new Submission({
        studentName: req.body.name,
        task: fileContent.replace(/\n|\r/g, " "),
      });
      await newSub.save();

      return res.status(201).json({
        message: 'file uploaded successfully',
        details: newSub,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

//get file by ID
const getFileById = async(req, res)=>{
    try {
        const submission = await Submission.findById(req.params.id);
        if(!submission){
            return res.status(404).json({
                message:"File not found",
            });
        }
        return res.status(200).json({
            submission,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error",
            error: error,
          });
    }
}

module.exports = {uploadFile, getFileById};
