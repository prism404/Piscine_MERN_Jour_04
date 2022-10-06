const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected !'))

app.listen(4242, () => console.log("Server is up and running !"))