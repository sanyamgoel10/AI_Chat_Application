const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static('public'));

// // Routes
const homepage = require('./routes/HomepageRoutes.js');

// User Routes
app.use('/', homepage);


// 404 Error Handler
app.use((req, res) => {
    return res.render('error');
    // return res.status(404).json({
    //     error: "Invalid URL"
    // });
});

module.exports = app;