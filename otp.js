
const f2s = require("fast-two-sms");
var options = {
    authorization: "Ehi06FHgfTNdQBnotMJV4RKDC7rUpe1x83SaIsvk5yLmucY29lX4nJFyw3KGY2ocx98a7NqTM6LglHSm",
    message: 'this is your otp 1123',
    numbers: ['7498459713']
}
f2s.sendMessage(options).then((response) => {
    console.log(res)
}).catch((error) => {
    console.log(error)
})