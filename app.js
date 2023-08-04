const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');
var cons = require('consolidate')
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = 80;

//----mongo---------

mongoose.connect('mongodb://127.0.0.1:27017/My_db', { useNewUrlParser: true });

var db = mongoose.connection;

var opt1Schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    gender: String,
    clothcondition: String,
    clothcategory: String
});
var Opt1 = mongoose.model('Opt1', opt1Schema);
var contactSchema = new mongoose.Schema({
    name: String,
    email: String
});
var Contact = mongoose.model('Contact', contactSchema);

var joinSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String
});
var Join = mongoose.model('Join', joinSchema);

var opt2Schema = new mongoose.Schema({
    name: String,
    email: String,
});
var Opt2 = mongoose.model('Opt2', joinSchema);

app.use('/static', express.static('static_f'))
app.use(express.urlencoded())
//---------pug------------------
//set the template engine as pug
app.engine('html', cons.swig)
app.set('view engine', 'html')

// set the view directory
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.html', params)
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.html', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.html', params)
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
    res.status(200).render('donate.html', params)
})
app.get('/join', (req, res) => {
    const params = {}
    res.status(200).render('join.html', params)
})
app.post('/join', (req, res) => {
    var myData2 = new Join(req.body);
    myData2.save().then(() => {
        res.send("Your Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})
app.get('/opt1', (req, res) => {
    const params = {}
    res.status(200).render('opt1.html', params)
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
    res.status(200).render('opt2.html', params)
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