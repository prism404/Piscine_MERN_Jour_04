const express = require("express")
const router = express.Router()
const registerTemplateCopy = require('../models/registerModels')

router.post('/register', (req, res) => {
    const registerMember = new registerTemplateCopy({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    })
    registerMember.save()
    .then(data =>  {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/register')
module.exports = router