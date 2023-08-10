const {expressjwt}= require("express-jwt");
const Post = require("../models/postSchema");

module.exports.checkingToken = () => {
    // console.log("checking token is called");
    return expressjwt({
        secret: process.env.jwt_secret,
        algorithms: ["HS256"]
    });
};
 

module.exports.canEditDeletePost = async(req,res,next) =>{


    try {

        const post = await Post.findById(req.params.id);

        if(req.auth._id != post.userId){
            return res.json("Unauthorized for editing the post")
        }else{ 
            next()
        }
        // console.log("Edit ---------->",post);
        
        
    } catch (error) {
        console.log(error);
    }

}