import db from '../models/index.js';

const { Team, User } = db;

export const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;
        // const user = req.user;
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Team name is required." });
        }

        const id = 1; // Temporary until auth is done

        // const isUser = await User.findByPk(user.id);
        const user = await User.findByPk(id); // Temporary until auth is done
        // const isUser = user;
        // if (!isUser) {
        //     return res.status(404).json({ message: "User not found." });
        // }

        const existingTeam = await user.getTeam();
        if (existingTeam) {
            return res.status(400).json({ message: "User already belongs to a team." });
        }

        const isNewTeam = await Team.findOne({ where: { name } });
        if (isNewTeam) {
            return res.status(400).json({ message: "Team name already taken." });
        }

        const newTeam = await Team.create({ name, description });
        await user.setTeam(newTeam);
        user.role = "MP";
        user.teamId = newTeam.id;
        await user.save();

        return res.status(201).json(newTeam);


    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
}

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [{
                model: User,
                attributes: ['id', 'email', 'role']
            }]
        });
        return res.status(200).json(teams);

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }

}

/*
    TODO: Add more Team controllers (getTeamById, updateTeam, deleteTeam, etc...);
*/
