import db from "../models/index.js";
const { User } = db;
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    /*
        Metoda pentru crearea unui utilizator nou.
        Params:
        - req: Contine in body datele utilizatorului (email, password)
        - res: Raspunsul HTTP
        
        Returns:
        - User nou creat sau mesaj de eroare daca utilizatorul exista deja.
    */
    try {
        const { email, password } = req.body;
        const existing_user = await User.findOne({
            where: { email: email }
        }) 

        if (!existing_user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const new_user = await User.create({
                email: email,
                password: hashedPassword
            })
            return res.status(200).json({
                message: "User created",
                user: new_user
            })

        } else {
            return res.status(400).json({
                message: "User already exists."
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        })
    }
}
