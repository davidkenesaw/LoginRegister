//send an email

const {sgMail} = require('../../Config/email.config')

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