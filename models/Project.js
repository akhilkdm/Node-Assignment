const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    estimatedHours: {
      type: Number,
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
