const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'Gmail'
    auth: {
        user: 'snehallande99@gmail.com',
        pass: 'zqiivvuvtuzlwdvx'
    },
});


const mailOptions = {
    from: 'snehallande99@gmail.com',
    to: 'shriyasawashe2020@gmail.com',
    subject: 'Hello shirdiiii how are you..... from Node.js',
    text: 'This is the plain text content of the email.',
    html: '<p>This is the <b>HTML</b> content of the email.</p>',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
