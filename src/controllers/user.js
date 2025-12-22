export const register = async (req, res) => {
    try {
        const { username, password } = req.body
    } catch (error) {
        res.status(500).json({
            msg: "Ошибка сервера при регстратция"
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
