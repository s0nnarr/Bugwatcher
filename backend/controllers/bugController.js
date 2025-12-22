import db from "../models/index.js";

const { Bug, User, Project } = db;

export const createBug = async (req, res) => {

    try {
        const { title, description, severity, priority, projectId, assignedUserId } = req.body;
        // assignedUserId = ID-ul userului care a postat bug-ul
        if (!title || title.trim() === "" || !projectId || !assignedUserId || !severity || !priority) {
            return res.status(400).json({ message: "Missing information in req.body" });
        }
      
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        if (assignedUserId) {
            const assignedUser = await User.findByPk(assignedUserId);
            if (!assignedUser) {
                return res.status(404).json({ message: "Assigned user not found." });
            }
        }
        let status = "OPEN";
        const newBug = await Bug.create({
            title,
            description,
            severity,
            priority,
            status,
            projectId,
            assignedUserId
        });

        return res.status(201).json(newBug);

    } catch (err) {
       return res.status(500).json({
        message: "Internal server error.",
        error: err.message
       }) 
    }
}

// TODO :
/* CONTROLERE:
- getBugsByProjectId
- updateBug
- deleteBug
*/
