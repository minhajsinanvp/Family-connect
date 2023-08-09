

const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({


    name: {
        type: String,
        trim : true,
        required : true
    },
    email : {
        type: String,
        trim : true,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true,
        max: 64
    },
    secret: {
        type: String,
        trim : true,
        required : true
    },
    about:{},
    photo: String,
    following:[{type: mongoose.Schema.ObjectId, ref: "User"}],
    followers:[{type: mongoose.Schema.ObjectId, ref: "User"}]

},{
    timestamps: true
})



const User = mongoose.model("User", userSchema);


module.exports = User;