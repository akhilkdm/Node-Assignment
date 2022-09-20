const express = require("express");
const { createProject } = require("../controllers/projectController");


const router = express.Router();

router.route("/createProject").post(createProject)

module.exports= router;