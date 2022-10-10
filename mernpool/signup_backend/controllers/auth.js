const Member = require("../models/memberModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({ error: err });
      }
    });

    const member = new Member({
      login: req.body.login,
      email: req.body.email,
      password: hashedPass,
      type: req.body.type,
    });

    member.save()
    .then(member => {
        res.json({ message: 'User added Successfully' })
    })
    .catch(err => {
        res.json({ message: 'An error has occured' })
    })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    Member.findOne({$or: [{ email: login }]})
    .then(member => {
        if (member) {
            bcrypt.compare(password, member.password, function(err, result) {
                if (err) {
                    res.json({ error: err })
                }

                if (result) {
                    let token = jwt.sign({ email: member.email }, 'verySecretValue', { expiresIn: '1h' })
                    res.json({ message: 'Login Successful !' })
                } else {
                    res.json({ message: 'Login or Password doesn\'t match' })
                }
            })
        } else {
            res.json({ message: 'No user found' })
        }
    })
}

module.exports = {
    register, login
}