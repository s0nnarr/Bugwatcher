import db from "../models/index.js";
import bcrypt from "bcrypt";
const { User } = db;

export const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Email invalid." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Parola trebuie sa aiba minim 6 caractere." });
    }
    if (role && role !== "MP" && role !== "TST") {
      return res.status(400).json({ message: "Role invalid. Foloseste MP sau TST." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "TST"
    });

    const userJson = newUser.toJSON();
    delete userJson.password;

    return res.status(201).json(userJson);

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validări simple (doar dacă vin în body)
    if (email !== undefined) {
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Email invalid." });
      }
      user.email = email.toLowerCase();
    }

    if (role !== undefined) {
      if (role !== "MP" && role !== "TST") {
        return res.status(400).json({ message: "Role invalid." });
      }
      user.role = role;
    }

    await user.save();

    const userJson = user.toJSON();
    delete userJson.password;

    return res.status(200).json(userJson);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
};



