
import  jwt  from "jsonwebtoken"
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
        const user = await User.findOne({username})

        if(!user){
         return  res.status(404).json({msg: "Ползователь не найден!"})
        }

        const correctPassword = await bcrypt.compare(password , user.password)

        if(!correctPassword){
            return res.status(401).json({
                msg: "Не правеный пароли или юзернейм!"
            })
        }

        const token = jwt.sign(
            {
                id : user._id,
                username : user.username,
            },
            process.env.JWT_SECRET,
            {expiresIn : "30d"}
        )

    return  res.status(200).json({
            user,
            token,
            msg : "Вы вошли в систему!!"
        })



    } catch (error) {
        res.status(500).json({
            msg: "Ошибка сервера при авторизатция"
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
