const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectId: { type: String, required: true },
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    projectEmployees: { type: String, required:true }
},{
    timestamps:true,
});

const projects = mongoose.model('projects', projectSchema);

module.exports = projects;