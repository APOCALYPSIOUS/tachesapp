var express = require('express');
var router = express.Router();
const User = require("../model/User");
const {getUsers,register,deleteUser,updateUser} = require("../controllers/UserController");
const {logIn,getMe} = require("../controllers/userController");
const {auth} = require("../middleware/authMiddleware");

/* GET users listing. */
router.get('/',getUsers);


router.post('/register',register);

router.post('/login',logIn);

router.get('/profile',auth,getMe);

router.delete('/:id',deleteUser);

router.put('/:id',updateUser);





module.exports = router;
