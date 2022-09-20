const express = require("express");
const {
  register,
  login,
  updateProfile,
  loggedInCheck,
  logout,
  otherUsers,
} = require("../controllers/userController");

const router = express.Router();

//---------Register-------
router.route("/register").post(register);

//----------Login--------
router.route("/login").get(login);

//----------update user-------
router.route("/updateProfile/:id").put(loggedInCheck, updateProfile);

//-----------other users----------
router.route("/otherUsers").post(loggedInCheck, otherUsers);

//------------logout-------
router.route("/logout").get(logout);

module.exports = router;
