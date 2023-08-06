const { passwordHash, comparePassword } = require("../helpers/hasPassword");
const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');
const {expressjwt} = require("express-jwt");





module.exports.register = async (req, res) => {
    // console.log("Register Endpoint ==>", req.body);

    const { name, email, password, secret } = req.body;


    if (!name || !email || !password || !secret) {
        return res.status(400).send("All fields are mandatory to fill");
    }

    const exist = await User.findOne({ email });

    if (exist) {
        return res.status(400).send("Email is already Taken")
    }

    const hashedPassword = await passwordHash(password);

    const newUser = new User({
        name: name,
        email,
        password: hashedPassword,
        secret
    })


    try {
        await newUser.save();
        return res.json({
            ok: true
        })

    } catch (error) {
        res.status(400).send("Error try again")
    }


}



module.exports.login = async (req, res) => {
    // console.log("Register Endpoint ==>", req.body);
  

    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).send("All fields are mandatory to fill");
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send("User not exist")
    }

    const match = await comparePassword(password, user.password);




    try {


        if (!match) return res.status(400).json("Incorrect password")


        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, { expiresIn: '7D' })
        user.password = undefined;
        user.secret = undefined;

        return res.status(200).json({
            token,
            user
        })


    } catch (error) {
        console.log("Error on login ", error);
        res.status(400).send("Error on Login try again later")
    }


}



module.exports.loggedUser = async(req,res) =>{
    const UserSignId = req.auth._id;


    try {
        const userData = await User.findById(UserSignId)
        // res.json(userData)
        res.json({ok: true})
    } catch (error) {
        res.sendStatus(400)
    }

}