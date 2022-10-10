const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const Billet = require('./models/billet')
const billetRouter = require("./routes/billets");
const methodOverride = require('method-override');
const app = express();

dotenv.config();
app.set("view engine", "ejs");
app.use(methodOverride('_method'))


mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database !')
})


// Route Middleware
app.use("/blogpool", routesUrls);
app.get("/", async (req, res) => {
  const billets = await Billet.find().sort({ createdAt: 'desc' })
  res.render("billets/index", { billets: billets });
});

app.use("/billets", billetRouter);

// app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.listen(4000, () => console.log("Server is up and running !"));
