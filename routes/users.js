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

router.delete('/:id',async (req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  }catch (err) {
    res.status(500).json({message: "err.message"});
  }
})

router.put('/:id',async (req,res)=>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.json(user);
  }catch (err) {
    res.status(500).json({message: "err.message"});
  }
})

router.get('/:id',async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    res.json(user);
  }catch (err) {
    res.status(500).json({message: "err.message"});
  }
})



module.exports = router;
