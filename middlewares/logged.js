const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.token === "") return res.redirect("/login");
  else {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_PASSKEY);

    // only send the me
    let user = await userModel.findOne({ _id: decoded.id }).select("-password");

    // to avoid me and send all users
    let users = await userModel
      .find({ _id: { $nin: [user._id] } })
      .select("-password");
    req.users = users;
    req.user = user;
  }
  next();
};
