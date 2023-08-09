const { passwordHash, comparePassword } = require("../helpers/hasPassword");
const User = require("../models/userSchema");
const Post = require("../models/postSchema");
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.cloudinaryname,
    api_key: process.env.cloudinarykey,
    api_secret: process.env.cloudinarysecret

})


module.exports.register = async (req, res) => {
    // console.log("Register Endpoint ==>", req.body);




    try {
        const { name, email, password, secret } = req.body;


        if (!name || !email || !password || !secret) {
            return res.status(400).send("All fields are mandatory to fill");
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json("Email is already Taken")
        }

        const hashedPassword = await passwordHash(password);

        const newUser = new User({
            name: name,
            email,
            password: hashedPassword,
            secret
        })
        await newUser.save();
        return res.json({
            ok: true
        })

    } catch (error) {
        res.status(400).json("Error try again")
    }


}



module.exports.login = async (req, res) => {
    // console.log("Register Endpoint ==>", req.body);
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                error: "All fields are mandatory to fill"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: "User not found"
            })
        }

        const match = await comparePassword(password, user.password);



        if (!match) {
            return res.json({
                error: "Password is incorrect"
            })
        }


        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, { expiresIn: '7D' })
        user.password = undefined;
        user.secret = undefined;

        return res.status(200).json({
            token,
            user
        })


    } catch (error) {
        console.log("Error on login ", error);
        return res.status(400).json({
            error: "Try again"
        })
    }


}



module.exports.loggedUser = async (req, res) => {


    try {
        const UserSignId = req.auth._id;

        const userData = await User.findById(UserSignId)
        // res.json(userData)
        res.json({ ok: true })
    } catch (error) {
        res.sendStatus(400)
    }

}





module.exports.passwordRecovery = async (req, res) => {
    // console.log(req.body);

    const { email, newPassword, secret } = req.body;

    if (!newPassword || (newPassword.length) < 6) {
        return res.json({
            error: "New password should have minimum 6 character"
        })
    }

    if (!secret) {
        return res.json({
            error: "Secret is required"
        })
    }


    const userExist = await User.findOne({ email, secret });

    if (!userExist) {

        return res.json({
            error: "User not found"
        })
    }

    try {


        const hashedPassword = await passwordHash(newPassword);


        await User.findByIdAndUpdate(userExist._id, { password: hashedPassword })

        return res.json({
            sucess: "Password is resetted succesfully"
        })





    } catch (error) {
        res.json({
            error: "Try agiain", error
        })
    }



    // if(!userEmail) return res.status(404).json("Email is not registered")

    // if(userSecret && userEmail) return res.status(200).json({ok: true})

    // return res.status(404).json("User not found")



}



module.exports.creatPost = async (req, res) => {
    //    
    // console.log(req.header('authorization'));



    const { content, imageDetails } = req.body;
    // console.log(req.body); 

    if (!content) return res.json({ error: "content cant be empty" })

    try {

        const post = new Post({
            content,
            userId: req.auth._id,
            image: imageDetails
        })

        post.save();
        res.json({ success: "Post created successfully", post })


    } catch (error) {
        return res.json({ error: "Some thing went wrong try again" })
    }


}



module.exports.imageUpload = async (req, res) => {
    // console.log(req.files);
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        // console.log("Upload url image: ", result);

        res.json({

            url: result.secure_url,
            public_id: result.public_id

        })
    } catch (error) {
        console.log(error);
    }

}




module.exports.userPosts = async (req, res) => {
    console.log(req.auth._id);

    try {
        // const posts = await Post.find({ userId: req.auth._id })
        const posts = await Post.find({})
            .populate("userId", "_id name image")
            .sort({ createdAt: -1 })
            .limit(10);

        // console.log(posts);

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
}




module.exports.editPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        console.log(post);
        res.json(post)

    } catch (error) {
        res.json(error)
    }
}