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

export const getBugsByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params; 

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        const bugs = await Bug.findAll({
            where: { projectId: projectId },
            include: [
                {
                    model: User,
                    as: 'assignedUser', 
                    attributes: ['id', 'email', 'role'] 
                }
            ]
        });

        return res.status(200).json(bugs);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
};

export const updateBug = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, severity, priority, status, assignedUserId } = req.body;

        const bug = await Bug.findByPk(id);
        if (!bug) {
            return res.status(404).json({ message: "Bug not found." });
        }

        if (assignedUserId) {
            const userExists = await User.findByPk(assignedUserId);
            if (!userExists) {
                return res.status(404).json({ message: "New assigned user not found." });
            }
        }

        await bug.update({
            title: title || bug.title,
            description: description || bug.description,
            severity: severity || bug.severity,
            priority: priority || bug.priority,
            status: status || bug.status,
            assignedUserId: assignedUserId || bug.assignedUserId
        });

        return res.status(200).json({ message: "Bug updated successfully", bug });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
};


export const deleteBug = async (req, res) => {
    try {
        const { id } = req.params;

        const bug = await Bug.findByPk(id);
        if (!bug) {
            return res.status(404).json({ message: "Bug not found." });
        }

        await bug.destroy();
        return res.status(200).json({ message: "Bug deleted successfully." });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
};




// TODO :
/* CONTROLERE:
- getBugsByProjectId
- updateBug
- deleteBug
*/
