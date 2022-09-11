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


//send an email
function sendEmail(To, code){
    const msg = {
        to: To, 
        from: process.env.EMAIL, 
        subject: 'Authentication',
        text: 'Type in the code:' + code + ", to authenticate"
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}


module.exports = {sendEmail}