const express = require("express");
const { createProject, updateProject, allProjects, deleteProject } = require("../controllers/projectController");
const { loggedInCheck } = require("../controllers/userController");


const router = express.Router();

//--------------new project---------
router.route("/createProject").post(loggedInCheck, createProject);

//------------update project---------
router.route("/updateProject").put(loggedInCheck, updateProject);

//------------delete project----------
router.route("/deleteProject").delete(loggedInCheck, deleteProject);

//------------all projects------------
router.route("/allProjects").get(loggedInCheck, allProjects)

module.exports= router;