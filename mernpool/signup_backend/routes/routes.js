const express = require("express")
const router = express.Router()
const registerTemplateCopy = require('../models/registerModels')

// Validation 
const Joi = require('joi')
const schema = {
    login: Joi.string().min(5).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required()
};

router.post('/register', async (req, res) => {
    const {error} = Joi.validate(req.body, schema);
    res.send(error.details[0].message);

    const registerMember = new registerTemplateCopy({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    });
    registerMember.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).send(err);
    })
});

// router.get('/home', "")
// router.get('/pool/:id', "")
module.exports = router;