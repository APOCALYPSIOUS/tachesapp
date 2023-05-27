var express = require('express');
var router = express.Router();
const User = require("../model/User");
const {getUsers,register,deleteUser,updateUser} = require("../controllers/UserController");
const {getUserById,logIn} = require("../controllers/userController");

/* GET users listing. */
router.get('/',getUsers);


router.post('/register',register);

router.post('/login',logIn);

router.delete('/:id',deleteUser);

router.put('/:id',updateUser);

router.get('/:id',getUserById);



module.exports = router;
