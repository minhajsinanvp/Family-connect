const {expressjwt}= require("express-jwt");

module.exports.checkingToken = () => {
    // console.log("checking token is called");
    return expressjwt({
        secret: process.env.jwt_secret,
        algorithms: ["HS256"]
    });
};
