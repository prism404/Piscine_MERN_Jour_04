const express = require("express");
const router = express.Router();
const Authenticate = require('../controllers/auth')
const memberSchema = require("../models/memberModels");

router.post('/register', Authenticate.register)
router.post('/login', Authenticate.login)

// Validation
// const Joi = require('joi')
// const schema = {
//     login: Joi.string().min(5).max(20).trim().required(),
//     email: Joi.string().required().email().trim(),
//     password: Joi.string().min(4).required(),
//     type: Joi.boolean().required()
// };

// RESTful Api
// Getting all users
router.get("/", async (req, res) => {
  try {
    const member = await memberSchema.find();
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:login?", getMember, (req, res) => {
  res.render("index", {
    login: req.params.login
  });
});

// Creating one
router.post("/", async (req, res) => {

    const member = new memberSchema({
      login: req.body.login,
      email: req.body.email,
      password: hashedPass,
      type: req.body.type,
    });

    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

});

// Updating one
router.patch("/", getMember, (req, res) => {});

// Deleting one

async function getMember(req, res, next) {
  try {
    member = await memberSchema.findById(req.params.id);
    if (member == null) {
      return res.status(404).json({ message: "Cannot find member" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.member = member;
  next();
}

router.get('/new', (req, res) => {
    res.render('billets/new')
})

module.exports = router;
