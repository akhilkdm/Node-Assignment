const express = require("express");
const {
  adminLogin,
  adminLogout,
  updateProject,
  adminCheck,
} = require("../controllers/adminController");
const { allProjects } = require("../controllers/projectController");
const router = express.Router();

//-----------admin login-------
router.route("/adminLogin").post(adminLogin);

//----------all projects-------
router.route("/allProjects").get(adminCheck, allProjects);

//------------update project-------
router.route("/updateProject").put(adminCheck, updateProject);

//-----------admin logout---------
router.route("/adminLogout").get(adminLogout);

module.exports = router;
