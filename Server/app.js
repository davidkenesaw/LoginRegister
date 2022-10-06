//require statements
const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const express = require("express");

const cookieParser = require('cookie-parser');
const {LogUserIn,insertUser,checkCodeEntered,RequireLogin,IsLoggedIn} = require('./ServerProcessing/LoginRegister')
const {sendEmail} = require('./ServerProcessing/email')
const {seshOption} = require('../Config/db.config')

//configre express app
const app = express();
app.set('view engine','ejs');//use ejs
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))//add bootsrap css
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))//add bootsrap javascript
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))//add bootsrap jquery
app.use(cookieParser(process.env.SECRETE));//change this and make it secrete
app.set('views', path.join(__dirname, '../Client/views'));//show express the views directory
app.use(express.static(path.join(__dirname, '../Client')));//show express the Client directory
app.use(seshOption)//configuration for express session

//get Pages
app.get("/", IsLoggedIn,function(req,res){//landing page
    res.render("homeLoggedOut");
});
app.get("/LoginPage",  function(req,res){//login page
    const error = "";
    res.render("Login",{error});
});
app.get("/RegisterPage",function(req,res){//register page
    const error = "";
    res.render("Register",{error});
});
app.get('/CodePage',function(req,res){//enter in a code page
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    //10 digit random number
    req.session.Code = randomNumber
    //add code to users session
    sendEmail(req.session.Email,randomNumber)
    //send email of code to user 
    
    const error = "";
    res.render('CodePage', { error });
});
app.get('/UserRegistered',function(req,res){//page displaying user is registered
    res.render('Registered');
});
app.get("/Homepage",RequireLogin,function(req,res){//homepage
    res.render("homeLoggedIn");
});

//http post requests
app.post("/Login",LogUserIn)//login functionality
app.post('/CompleteLogin',checkCodeEntered);
app.post("/Register",insertUser)//register functionality
app.post("/SignOut",function(req,res){

    req.session.UserName = null;
    //set users session username to null 

    req.session.loggedIn = false;

    res.redirect('/');
})
app.post("/SendAgain",(req,res)=>{//send code again
    res.redirect('/CodePage');
})

app.listen(process.env.PORT || 3456,function(){//host site
    console.log("Port: 3456");
});