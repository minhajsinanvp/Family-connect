const express = require('express');
const formidable = require("express-formidable");

const { register, login, loggedUser, passwordRecovery, creatPost, imageUpload } = require('../controller/userController');
const { checkingToken } = require('../middlewares/authen');

const router = express.Router();

router.post("/register", register );
router.post("/login", login);
router.get("/loggedUser", checkingToken(), loggedUser); // Apply checkingToken middleware here
router.post("/forgotpassword", passwordRecovery);
router.post("/create-post", checkingToken(), creatPost); // Apply checkingToken middleware here
router.post("/image-upload", checkingToken(), formidable({ maxFileSize: 5 * 1024 }), imageUpload); // Apply checkingToken middleware here

module.exports = router;
