const mongoose = require('mongoose');

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
var Join1 = mongoose.model('Join1', joinSchema);
var opt2Schema = new mongoose.Schema({
    name: String,
    email: String,
});
var Opt2 = mongoose.model('Opt2', opt2Schema);

module.exports={
    Opt1,Opt2,Contact,Join1
}