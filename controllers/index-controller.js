const userModel = require("../models/user");
const chatModel = require("../models/chat");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// landing page rendering

module.exports.lendingPageController = (req, res, next) => {
  res.render("index");
};


// user rgistration

module.exports.userCreationsController = (req, res, next) => {
  let { name, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
        let user = await userModel.create({
            name,
            email,
            password: hash
        })
        let token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_PASSKEY);
        res.cookie('token', token);
        req.me = user;
        res.redirect('/dashboard')
    });
  })
};

// user login page randering

module.exports.userLoginPageController = (req, res, next) => {
  res.render("login");
};


// user login post

module.exports.userLoginController = async (req, res, next) => {
  let {email, password} = req.body;
  let user = await userModel.findOne({email});
  if (!user) res.status(404).send({message: "user not found"});
  bcrypt.compare(password, user.password, (err, result) => {
    if(result){
      let token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_PASSKEY);
      res.cookie('token', token);
      req.me = user;
      res.redirect('/dashboard');
    }else{
      res.redirect('/');
    }
  })
};


//user logout

module.exports.userLogoutController = (req, res, next) => {
  res.cookie('token', '');
  res.redirect('/login');
};



// type any url we redirect to login page

module.exports.redirectLoginController = (req, res, next) =>{
  res.redirect('/login');
}

//user dashboard

module.exports.userDashboardController = async (req, res, next) => {
  let user = req.user;
  let users = req.users;
  res.render('dashboard', {me: user, users});
};
