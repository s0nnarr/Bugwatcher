import db from "../models/index.js";
import bcrypt from "bcrypt";
import zxcvbn from 'zxcvbn';
import createAccessToken from "../utils/createAccessToken.js";
import { accessOptions } from "../utils/cookiesConfig.js";

const { User, Project } = db;

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

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged out successfully." });

  } catch (err) {
    return res.status(500).json({ message: "Internal Server error", error: err });
  }
}
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

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      include: {
        model: Project,
        as: 'projects',
        through: { attributes: [] } // hide userProject table
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user.projects);

  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

