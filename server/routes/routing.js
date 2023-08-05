const express = require('express');
const { register, login, loggedUser } = require('../controller/userController');
const { checkingToken } = require('../middlewares/authen');

const router = express.Router();






router.post("/register", register )
router.post("/login", login)
router.get("/loggedUser",checkingToken(),loggedUser)



module.exports = router