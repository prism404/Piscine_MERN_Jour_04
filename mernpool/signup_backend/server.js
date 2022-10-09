const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected !'))

// Route Middleware
app.use('/api/user', routesUrls)

const posts = [
    {
        login: "logan",
        email: "logan@gmail.com"
    },
    {
        login: "oliver",
        email: "oliver@gmail.com"
    }
]

app.post('/login', (req, res) => {
    // Authenticate user
    const login = req.body.login
    const member = { login: login }

    const accessToken = jwt.sign(member, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

app.use(express.json())
app.use(cors())

app.listen(4000, () => console.log("Server is up and running !"))