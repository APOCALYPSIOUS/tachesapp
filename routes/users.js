var express = require('express');
var router = express.Router();
const User = require("../model/User");

/* GET users listing. */
router.get('/',async (req,res)=>{
  try{
    const users = await User.find();
    res.json(users);
  }catch (err) {
    res.status(500).json({message: "err.message"});
  }
}
  );

router.post('/',async (req,res)=>{
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  try{
    const newUser = await user.save();
    res.json(newUser);
  }catch (err) {
    res.status(500).json({message: "err.message"});
  }
})

module.exports = router;
