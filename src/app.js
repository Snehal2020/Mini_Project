const express = require("express");
const hbs =require("hbs")
const fs = require("fs");
const mongoose = require('mongoose');
var cons = require('consolidate')
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const collect = require("../src/models/schema")
require("./db/conn")
const port = 3000;

app.use(express.urlencoded({ extended: false }))
// var db = mongoose.connection;

app.use('/static', express.static('static_f'))
app.use(express.urlencoded())
//---------pug------------------
//set the template engine as pug
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// set the view directory
app.set("views", path.join(__dirname, "../templates/views"))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index', params)
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact', params)
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Your Contact Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})
app.get('/donate', (req, res) => {
    const params = {}
    res.status(200).render('donate', params)
})
app.get('/join', async (req, res) => {
    const params = {}
    // const data = await Join1.find();
    // res.status(200).render(data, params)
    res.status(200).render('join', params)
    // res.send(data);

})
app.post('/join', (req, res) => {
    var myData2 = new Join1(req.body);
    myData2.save().then(() => {
        res.send("Your Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})
app.get('/opt1', (req, res) => {
    const params = {}
    res.status(200).render('opt1', params)
})
app.post('/opt1', (req, res) => {
    var myData1 = new Opt1(req.body);
    myData1.save().then(() => {
        res.send("Your Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})

app.get('/opt2', (req, res) => {
    const params = {}
    res.status(200).render('opt2', params)
})
app.post('/opt2', (req, res) => {
    var myData3 = new Opt2(req.body);
    myData3.save().then(() => {
        res.send("Your Cloth Donation Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})

app.listen(port, () => {
    console.log(`The application started successfully on ${port}`)
})