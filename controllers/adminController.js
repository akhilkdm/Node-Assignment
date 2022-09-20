const Project = require("../models/Project");

//-------admin credentials-----------
const adminCredential = {
  email: "admin@gmail.com",
  password: "asdfg",
};

//---------session check-------------
const adminCheck = async (req, res, next) => {
  if (req.session.adminData) {
    next();
  } else {
    res.json("Plese login");
  }
};

//------------admin login----------
const adminLogin = async (req, res) => {
  try {
    if (
      adminCredential.email === req.body.email &&
      adminCredential.password === req.body.password
    ) {
      req.session.adminData = req.body.email;
      res.status(200).json("Admin logged in successfully");
    } else {
      res.status(401).json("Invalid email or password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//---------------update a  project------
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.body.projectId, {
      $set: req.body,
    });
    if (project) {
      res.status(200).json("Project updated successfully");
    } else {
      res.status(404).json("project not found to edit");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//------------admin logout----------
const adminLogout = async (req, res) => {
  req.session.adminData = null;
  res.status(200).json("Logged out successfully");
};

module.exports = {
  adminCheck,
  adminLogin,
  updateProject,
  adminLogout,
};
