const express = require('express');
const formidable = require("express-formidable");

const { register, login, loggedUser, passwordRecovery, creatPost, imageUpload, userPosts, editPost, updatePost, deletePost } = require('../controller/userController');
const { checkingToken, canEditDeletePost } = require('../middlewares/authen');
 
const router = express.Router();
 
router.post("/register",register);
router.post("/login", login);
router.get("/logged-user", checkingToken(), loggedUser); // Apply checkingToken middleware here
router.post("/forgotpassword", passwordRecovery);
router.post("/create-post", checkingToken(), creatPost); // Apply checkingToken middleware here
router.post("/image-upload", checkingToken(), formidable({maxFileSize: 5 * 1024 * 1024}), imageUpload); // Apply checkingToken middleware here
router.get("/get-post",checkingToken(),userPosts)

 
router.get("/edit-post/:id",checkingToken(),editPost)
router.put("/update-post/:id",checkingToken(),canEditDeletePost,updatePost)
router.delete("/delete-post/:id",checkingToken(), canEditDeletePost,deletePost)

module.exports = router;   
            