const {expressjwt}= require("express-jwt");

module.exports.checkingToken = () => {
    return expressjwt({
        secret: process.env.jwt_secret,
        algorithms: ["HS256"]
    });
};
