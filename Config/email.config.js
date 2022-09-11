//000859536
//David VanAsselberg
//9/5/2022

const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const sgMail = require('@sendgrid/mail')

//email api
sgMail.setApiKey(process.env.EMAILKEY)


module.exports = {sgMail}