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
        res.redirect('/')
    });
  })
};
