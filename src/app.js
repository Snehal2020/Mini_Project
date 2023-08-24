const express = require("express");
const twilio = require("twilio");
require("dotenv").config()
const cookieparser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const hbs = require("hbs")
var cons = require('consolidate')
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const collect = require("../src/models/schema")
require("./db/conn")
const auth = require("../src/midleware/auth")
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }))
// var db = mongoose.connection;

app.use('/static', express.static('static_f'))
app.use(express.urlencoded())
app.use(cookieparser())
//---------pug------------------
//set the template engine as pug
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// set the view directory
app.set("views", path.join(__dirname, "../templates/views"))

// const f2s=require("fast-two-sms");
// var options={authorization:"Ehi06FHgfTNdQBnotMJV4RKDC7rUpe1x83SaIsvk5yLmucY29lX4nJFyw3KGY2ocx98a7NqTM6LglHSm",
// message:"this is your otp",
// number:['7498459713']}
// f2s.sendMessage(options).then((response)=>{
//     console.log(response)
// }).catch((error)=>{
//     console.log(error)
// })
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
    var myData = new collect.Contact(req.body);
    myData.save().then(() => {
        res.send("Your Contact Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})
app.get('/donate', auth, (req, res) => {

    res.status(200).render('donate')
})
app.get('/join', async (req, res) => {
    const params = {}
    // const data = await Join1.find();
    // res.status(200).render(data, params)
    res.status(200).render('join', params)
    // res.send(data);

})
app.post('/join', (req, res) => {
    var myData2 = new collect.Join1(req.body);
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
    var myData1 = new collect.Opt1(req.body);
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
    var myData3 = new collect.Opt2(req.body);
    myData3.save().then(() => {
        res.send("Your Cloth Donation Form Has Been Submitted Successfully !")
    }).catch(() => {
        res.status(400).send("Not saved")
    })
})
app.get('/login', (req, res) => {
    const params = {}
    res.status(200).render('login', params)
})
app.get('/register', (req, res) => {
    const params = {}
    res.status(200).render('register', params)
})
app.post('/register', async (req, res) => {
    try {
        const pw = req.body.password;
        const cpw = req.body.confirm_password;
        pn = req.body.phone;
        if (pw === cpw) {
            const data = new collect.Regcol(req.body)

            const token = await data.generateT();
            console.log("\nToken" + token + "\n")

            //the res.cookie() function is used to set the cookies name to value
            //value can be string or object converted to json

            res.cookie("jwt", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            // console.log(cookie)

            const registered = await data.save();
            console.log(registered);


            res.status(201).render("otp");
        } else {
            res.send("Check your password")
        }

    } catch (error) {
        console.log(error)
    }
})
app.get('/sotp', (req, res) => {
    // Replace with your Twilio credentials
    const accountSid = 'ACe9e6b581039c613354b6812ddbec7c37';
    const authToken = '99f42723c58d1de9bb7a08b3a0950748';
    const twilioPhoneNumber = '+12513571352';

    const client = new twilio(accountSid, authToken);

    // Generate a random 6-digit OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    // Replace with the recipient's phone number
    const recipientPhoneNumber = '+91' + pn;
    console.log(recipientPhoneNumber);
    const otp = generateOTP();
    console.log(typeof (otp))

    // Send the OTP as an SMS
    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: recipientPhoneNumber,
        }).then(message => {
            console.log(`OTP sent successfully to ${message.to}`);
            console.log(`OTP sent successfully to ${otp}`);
            otp11 = otp;

        })
        .catch(error => {
            console.error('Error sending OTP:', error);
        });
})

app.get('/otp', (req, res) => {
    const params = {}
    res.status(200).render('otp', params)
})
app.post('/otp', async (req, res) => {

    try {

        const otp_e = req.body.otp;
        console.log("Hello..........")
        console.log(otp11)
        console.log("Hello..........")
        console.log(otp_e)
        if (otp_e == otp11) {
            res.send("mobile verification done");
        }
        else {
            res.render("index")
        }

    } catch (error) {
        res.status(400).send("invalid email")
    }
})
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user_email = await collect.Regcol.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, user_email.password)
        const token = await user_email.generateT();
        console.log("Token..." + token)
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
        });

        if (isMatch) {

            res.render("index")
            // id1.innerHTML=
        }
        else {
            const errorMessage = "gbhhhhhhhhhhhhhhhhh";
            res.render('login', { errorMessage });
        }
    } catch (error) {
        res.status(400).send("invalid email")
    }
})
app.get('/logout', auth, async (req, res) => {
    try {
        req.data.tokens = [];
        res.clearCookie("jwt")
        await req.data.save();
        console.log("logout successfully")
        res.render("login")
    } catch (error) {
        res.send(error)
    }

})
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`)
})