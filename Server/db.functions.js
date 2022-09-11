//000859536
//David VanAsselberg
//9/5/2022

const dbConn = require('../Config/db.config');
const {sendEmail} = require('../Config/email.config')

//function to log user in
function LogUserIn(req,res){//not done
    const user = req.body.Username;
    const Password = req.body.Password;//add use of password
    
    //database query
    dbConn.query("SELECT * FROM Users WHERE UserName = ? AND Password = ?",[user,Password],function(err,rows){
        
        //if an error occures
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Login',{error});
        }
        else{//log user in the redirect to Codepage
            if(rows.length == 1){
                res.cookie('Email',rows[0].Email,{signed:true});
                console.log(rows[0].Email)
                res.cookie('UserName',rows[0].UserName);
                res.redirect('/CodePage');
            }else{//could not find user or password wrong
                const error = "there was an issue with your username or password";
                res.render('Login',{error});//this is wrong
            }
        }

    });
}

//function to register user
function insertUser(req,res){

    const UserName = req.body.UserName;
    const Password = req.body.Password;

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Major = req.body.Major;
    const Email = req.body.Email;

    //database query
    dbConn.query("INSERT INTO Users (UserName,Password,FirstName,LastName,Major,Email) VALUES (?,?,?,?,?,?)",[UserName,Password,FirstName,LastName,Major,Email],function(err,result){
        
        //if an error occures
        if(err){
            const error = "User Taken";
            res.render('Register',{error});//this is wrong
        }else{//register user
            console.log("Data inserted");
            res.redirect("/UserRegistered");//this is wrong
        }
    });

}

module.exports = {LogUserIn,insertUser}