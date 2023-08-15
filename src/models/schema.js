const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
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
const regSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password: {
      type: String,
      required: true,
    },
    tokens: [{
      token: {
        type: String,
        required: true,
      }
    }]
  })

  //token
regSchema.methods.generateT = async function (next) {
    try {
      const token = jwt.sign({ _id: this._id.toString() }, "hello")
      this.tokens = this.tokens.concat({ token: token })
      console.log("\ntoken:" + token+"\n")
      await this.save();
      return token
    } catch (error) {
      console.log(error)
    }
  }
  
  //to secure password
  regSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10)
      this.confirm_password =await bcrypt.hash(this.password, 10)
    }
  })

  const Regcol = new mongoose.model("Regcol", regSchema)
module.exports={
    Opt1,Opt2,Contact,Join1,Regcol
}