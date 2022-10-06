const {dbConn} = require('../../Config/db.config');
const bcrypt = require('bcrypt')
const saltRounds = 10;

//function to log user in
function LogUserIn(req,res){//not done
    const user = req.body.Username;
    const Password = req.body.Password;//add use of password
    
    //database query
    dbConn.query("SELECT * FROM Users WHERE UserName = ?",[user],function(err,rows){
        
        //if an error occures
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Login',{error});
        }
        else{//log user in the redirect to Codepage
            if(rows.length == 1){
                bcrypt.compare(Password,rows[0].Password, function(err, result) {
                    if(result == true){//if logged in is successful
                        req.session.UserName = rows[0].UserName;
                        req.session.FirstName = rows[0].FirstName;
                        req.session.LastName = rows[0].LastName;
                        req.session.Major = rows[0].Major;
                        req.session.Email = rows[0].Email;
                        //add user info to users session
                        req.session.loggedIn = false;
                        console.log(rows[0].Email)
                        res.redirect('/CodePage');
                    }else{
                        const error = "Password is wrong";
                        res.render('Login',{error});//this is wrong
                    }
                });
                
            }else{//could not find user or password wrong
                const error = "issue with username";
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

    //encrypt 
    bcrypt.hash(Password, saltRounds, function(err, hash) {
    //database query
        dbConn.query("INSERT INTO Users (UserName,Password,FirstName,LastName,Major,Email) VALUES (?,?,?,?,?,?)",[UserName,hash,FirstName,LastName,Major,Email],function(err,result){
        
            //if an error occures
            if(err){
                const error = "User Taken";
                res.render('Register',{error});
            }else{//register user
                console.log("Data inserted");
                res.redirect("/UserRegistered");
            }
        });
    });
}

//chech for user code

function checkCodeEntered(req,res){
    const crackedCode = req.session.Code;
    //get code from users session
    const user = req.body.code;

    if(user == crackedCode){//code correct redirect to homepage
        req.session.loggedIn = true;
        res.redirect("/Homepage");
    }else{
        const error = "code incorrect"; 
        res.render("CodePage",{error})
    }
}

//middleware
function RequireLogin(req, res, next){

    //if user in sot loggen in the the user will be redirected to log in page
    

    if(!req.session.loggedIn){
        return res.redirect('/LoginPage')
    }next()
}
function IsLoggedIn(req, res, next){
    //if user is logged in then user will be redirected to logged in homepage
    
    if(req.session.loggedIn){
        return res.redirect('/Homepage')
    }next()
}

module.exports = {LogUserIn,insertUser,checkCodeEntered,RequireLogin,IsLoggedIn}