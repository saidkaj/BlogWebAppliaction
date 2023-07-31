import { decrypt } from "dotenv"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register user

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: "Username is taken!"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        await newUser.save()

        res.json({
            newUser,
            message: "Succesfully registered!"
        })
    } catch (error) {
        res.json({
            message: "Registration error!"
        })
    }
}

// Login user

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                message: "User doesn't exist."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: "Password is incorrect"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        )

        res.json({
            token,
            user,
            message: "Succesfully Loged in"
        })


    } catch (error) {
        res.json({
            message: "Login error!"
        })
    }
}

// Get me

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "User doesn't exist."
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        return res.json({
            message: "You have no access."
        })
    }
}
