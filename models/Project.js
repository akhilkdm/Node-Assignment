const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required:true
    },
    estimatedHours: {
      type: Number,
      required: true
    },
    tools: {
      type: Array,
      default: [],
    },
    methodology: {
      type: String,
    },
    numberOfDevelopers: {
      type: Number,
    },
    mobileApp: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
