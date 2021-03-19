const {verify} = require('jsonwebtoken');
const {User} = require("../models");

const isUser = async(req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            status:"error",
            message:"Access denied, no token"
        });
    }
    try {
        const { id } = verify(token, "ADMIN");
        const user = await User.findById(id);
        if (user) {
            req.user = user;
            return next();
        } 
        return res.status(404).json({
            status: "error",
            message: "Sorry User not found!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error: "invalid token",
        });
    }
}


module.exports = isUser;