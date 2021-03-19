const { User } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken")

//register user
const registerUser = async(req, res) =>{
  const { username, password } = req.body;
  try {
    let user = await User.findOne({username});
    if(user){
      return res.status(401).json({
        status:"error",
        message:"user already registered, login",
      });
    }
    user = new User({
      username,
      password
    });

    //hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //generate token for all users
    const token = sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "ADMIN",
      {expiresIn: "24h"}
    );

    return res.status(200).json({
      status:"success",
      message:"Successfully registered",
      data:{
        token,
        user:{
          _id: user._id,
          username: user.username,
      
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status:"error",
      error,
    })
  }
};
//login user
const login = async(req, res)=>{
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username});
    if(!user){
      return res.status(401).json({
        status:"error",
        message:"Username or password does not exist",
      })
    };
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(401).json({
        status:"error",
        message:"Email or password does not exist",
      })
    };
    const token = sign(
      {
        id: user._id,
      },
      "ADMIN",
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      status:"success",
      message:"Login successfully",
      data:{
        token,
        user:{
          _id: user._id,
          username: user.username,
        },
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status:"error",
      error
    })
  }
}

module.exports = {registerUser, login}