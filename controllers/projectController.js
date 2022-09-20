const Project = require("../models/Project");

//------------add a new project----------
const createProject = async (req, res) => {
  try {
    const newProject = new Project({
      userId: req.body.userId,
      projectName: req.body.projectName,
      startDate: new Date(req.body.startDate),
      estimatedHours: req.body.estimatedHours,
      tools: req.body.tools,
      methodology: req.body.methodology,
      numberOfDevelopers: req.body.numberOfDevelopers,
      mobileApp: req.body.mobileApp,
    });
    const project = await newProject.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

//-----------update a project--------
const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { $and: [{ _id: req.body.projectId }, { userId: req.body.userId }] },
      { $set: req.body }
    );
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json("Project not Exists");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//---------------delete a project-----------
const deleteProject = async ( req,res)=>{
    try{
        await Project.findOneAndDelete({
            $and:[{_id: req.body.projectId},{userId:req.body.userId}]
        })
        res.status(200).json("Project deleted successfully");
    }catch(err){
        res.status(500).json(err);
    }
}


// ---------get all projects------------
const allProjects = async (req, res) => {
  try {
    const project = await Project.find();
    if (project) {
      res.status(200).json(project);
    } else {
      res.stus(404).json("No Projects found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProject,
  updateProject,
  allProjects,
  deleteProject
};
