const express = require('express');
const { register, login, loggedUser, passwordRecovery, creatPost } = require('../controller/userController');
const { checkingToken } = require('../middlewares/authen');

const router = express.Router();






router.post("/register", register )
router.post("/login", login)
router.get("/loggedUser",checkingToken(),loggedUser)
router.post("/forgotpassword",passwordRecovery)
router.post("/create-post",checkingToken(), creatPost)



module.exports = router