import User from "../models/User.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const existUser = await User.findOne({ username })
        if (existUser) {
            return res.status(400).json({
                msg: "Данный имя пользовател уже занять"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            password: hashpassword
        })

        await user.save()
        return res.status(201).json({
            msg: "зарегистрроваиться успешно прошло!!",
               user
        })



    } catch (error) {
        res.status(500).json({
         
            msg: "Не удалось зарегистрроваиться",
        })
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body
    } catch (error) {
        res.status(500).json({
            msg: "Ошибка сервера при регстратция"
        })
    }
}
export const getMe = async (req, res) => {
    try {
        const { username, password } = req.body
    } catch (error) {
        res.status(500).json({
            msg: "Ошибка сервера при регстратция"
        })
    }
}
