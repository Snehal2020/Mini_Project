const twilio = require("twilio");

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
const recipientPhoneNumber = '+917498459713';

const otp = generateOTP();
console.log(typeof(otp))

// Send the OTP as an SMS
client.messages
  .create({
    body: `Your OTP is: ${otp}`,
    from: twilioPhoneNumber,
    to: recipientPhoneNumber,
  })
  .then(message => {
    console.log(`OTP sent successfully to ${message.to}`);
    console.log(`OTP sent successfully to ${otp}`);
  })
  .catch(error => {
    console.error('Error sending OTP:', error);
  });
