import db from "../models/index.js";
import axios from "axios";



const { Project, User, Team, Bug } = db;


export const createProject = async (req, res) => {
   
    // The project can either have a USER or TEAM as owner. 
    // We check if the userId belongs to a team
    // If yes, set owner_type to TEAM and owner_id to the user's team.
     
    try {
        const { title, commit_link } = req.body;

        // const user = req.user;
        const id = 1; // Temporary until auth is done
        const userExists = await User.findByPk(id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }
        const team = await userExists.getTeam();
        let ownerId, ownerType;
        


        try {
            if (!commit_link || commit_link.trim() === "" || !(commit_link.startsWith("https://"))) {
                return res.status(400).json({ message: "Invalid commit link." });
            }
            const data = await axios.get(commit_link);
            if (data.status !== 200 ) {
                return res.status(400).json({ message: "Invalid commit link." });
            }
        } catch (err) {
            return res.status(400).json({
                message: "Commit link unreachable.",
                error: err.message
            });
        }


        if (team) {
            ownerType = "TEAM";
            ownerId = team.id; // TeamID;
        } else {
            ownerType = "USER";
            ownerId = userExists.id;
        }


        const newProject = await Project.create({
            title,
            commit_link,
            owner_type: ownerType,
            owner_id: ownerId
        });
        let projectOwner;
        if (newProject.owner_type === "USER") {
            projectOwner = await User.findByPk(newProject.owner_id, {
                attributes: { exclude: ["password"] }
            });
        } else {
            projectOwner = await Team.findByPk(newProject.owner_id);
        }

        return res.status(201).json({
            message: "Project created successfully.",
            project: newProject,
            owner: projectOwner
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
}