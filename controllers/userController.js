const User = require("../models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");

//----------session check----------
const loggedInCheck = (req, res, next) => {
  if (req.session.userData) {
    console.log("akhil");
    next();
  } else {
    res.json("You are not logged in");
  }
};

//-----------register---------
const register = async (req, res) => { 
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//--------------login---------
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    req.session.userData = req.body.email;
    res.status(200).json({ user });
  } else {
    res.status(500).json("Invalid Email or password");
  }
};

//--------------update Profile--------
const updateProfile = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Profile Updated Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only update your only account");
  }
};

//---------other users--------
const otherUsers = async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $nin: req.body.userId } },
      { _id: 0, password: 0 }
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//----------logout---------
const logout = async (req, res) => {
  req.session.userData = null;
  res.json("Successfully logged out");
};

module.exports = {
  register,
  login,
  updateProfile,
  loggedInCheck,
  otherUsers,
  logout,
};
