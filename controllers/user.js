const User = require("../models/user.js");

module.exports.renderSignupForm =(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup =async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser =new User({username, email});
        const registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.login(registerUser, (err)=>{
            if(err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    }catch(e){  
        req.flash("error", e.message);
        res.redirect("/signup");
    }   
}

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success", "Welcome back!");
    console.log(res.locals.redirectUrl);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); //res.redirect("/listings");
}

module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    })
}