import { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    _id: String,
    Project: {
        Title: String,
        technologies: String
    },
    Technical_Skillset: {
        Frontend: String,
        Backend: String,
        Databases: String,
        Infrastructure: String
    }
})

const Project = models.Project || model("Project", projectSchema, 'Projects');

export default Project;