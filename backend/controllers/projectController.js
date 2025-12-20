import db from "../models/index.js";

const { Project } = db;

export const createProject = async (req, res) => {
    try {
        const { title, description, commit_link, userId } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required." });
        }

        const newProject = await Project.create({
            title,
            description,
            commit_link
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }

}