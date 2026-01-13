import db from "../models/index.js";
import bcrypt from "bcrypt";
import zxcvbn from 'zxcvbn';
import createAccessToken from "../utils/createAccessToken.js";
import { accessOptions } from "../utils/cookiesConfig.js";

const { User, Project } = db;

/**
 * Creează un user nou
 * @route POST /users
 * @param {Object} req.body - {email, password, role}
 * @returns {Object} user creat
 */

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


/**
 * Ia toți userii
 * @route GET /users
 * @returns {Object[]} lista de useri
 */

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


/**
 * Înregistrează un user (signup)
 * @route POST /users/register
 * @param {Object} req.body - {email, password, role}
 * @returns {Object} user creat
 */

export const registerUser = async (req, res) => {
  try {
    const {email, password, role} = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({message: "Email invalid."});
    }
    
    if (!password) {
      return res.status(400).json({message: "Password is required."});
    }
    const passStrength = zxcvbn(password);
    
    if (passStrength.score < 2) {
      return res.status(400).json({message: "Password too weak."});
    }
    
    if (role && role !== "MP" && role !== "TST") {
        return res.status(400).json({message: "Role invalid. Use MP or TST."});
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne(
      {where: {
        email: normalizedEmail
      },
      attributes: { exclude: ["password"] }
    });

    if (existingUser) {
      return res.status(409).json({message: "User with this email already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "TST"      
    })

    const userJson = newUser.toJSON();
    delete userJson.password;

    return res.status(201).json(userJson);

    } catch (err) {
          return res.status(500).json({ message: "Internal Server error", error: err });
    }    

}

   /**
   * Loghează un user (login)
   * @route POST /users/login
   * @param {Object} req.body - {email, password}
   * @returns {Object} user logat
   */

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(`Login attempt: ${email}, ${password}`);
      if (!email || !password) {
        return res.status(400).json({message: "Email and password are required."});
      }
      
      const normalizedEmail = email.trim().toLowerCase();

      let existingUser = await User.findOne({
        where: {
          email: normalizedEmail,
        }
      })

      if (!existingUser) {
        return res.status(401).json({message: "Invalid email or password."});
      }

      console.log("FOUND USER: ", existingUser.toJSON());
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        console.log("Password mismatch for user: ", existingUser.email);
        return res.status(401).json({message: "Invalid email or password."});
      }
      const userJson = existingUser.toJSON();
      delete userJson.password;
      existingUser = userJson;
    
      
      if (!accessOptions) {
        return res.status(500).json({ message: "Cookie configuration error." });
      }
      console.log("Access options loaded.");
      console.log("Creating access token for user ID: ", existingUser.id);

      const accessToken = createAccessToken(existingUser.id);
      res.cookie("accessToken", accessToken, accessOptions);
      res.status(200).json(existingUser);

    } catch (err) {
      console.log("LOGIN ERROR: ", err);
      return res.status(500).json({ message: "Internal Server error", error: err });
    }

  }

  /**
  * Ia un user după ID
  * @route GET /users/:id
  * @param {string} id - ID-ul userului
  * @returns {Object} userul găsit
  */

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

  /**
  * Actualizează un user după ID
  * @route PUT /users/:id
  * @param {string} id - ID-ul userului
  * @param {Object} req.body - {email, role}
  * @returns {Object} user actualizat
  */

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

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

/**
 * Loghează un user (logout)
 * @route POST /users/logout
 * @returns {Object} mesaj de succes
 */
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged out successfully." });

  } catch (err) {
    return res.status(500).json({ message: "Internal Server error", error: err });
  }
}

/**
 * Șterge un user după ID
 * @route DELETE /users/:id
 * @param {string} id - ID-ul userului
 * @returns {void} fara continut(204 No Content)
 */
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

/**
 * Recuperează datele userului logat
 * @route GET /users/me
 * @returns {Object} datele userului logat
 */

export const restoreUser = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
    
      return res.status(400).json({ message: "User ID missing in token." });
    
    };

    const user = await User.findByPk(id, { 
      attributes: { exclude: ["password"] }
    })
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message
    });
  }
}

/**
 * Ia proiectele unui user
 * @route GET /users/projects
 * @returns {Object[]} lista de proiecte
 */
export const getUserProjects = async (req, res) => {
  try {
    const userID = req.user?.id;
    console.log("Fetching projects for user ID:", userID);
    if (!userID) {
      return res.status(403).json({ message: "Unauthorized." });
    }
    const user = await User.findByPk(userID, {
      attributes: { include: ["id", "email", "role"] },
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    if (user.role === "MP") {
      const userWithProjects = await User.findByPk(userID, {
        include: [{
          model: Project,
          as: 'Projects',
          through: { attributes: [] },
        }],
        attributes: { exclude: ["password"] }
      });
      console.log("userWithProjects.Projects:", userWithProjects.Projects);
      console.log("userWithProjects: ", userWithProjects);
      return res.status(200).json({ Projects: userWithProjects });
    }
    else if (user.role === "TST") {
      projects = await Project.findAll({
        include: [{
          model: User,
          as: "Owner",
          attributes: ["id", "email", "role"]
        }]
      }
      );
      return res.status(200).json({ Projects: projects });
    } else {
      return res.status(400).json({ message: "Invalid user role." });
    }

  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

