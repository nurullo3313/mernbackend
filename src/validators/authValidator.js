import {body} from "express-validator"

export const loginValigator = [
    body("username", "минималная количество символ для имя 3").isString().isLength({min:3}),
    body("password", "минималная количество символ для пароль 8").isString().isLength({min:8}),
]

export const registerValigator = [
    body("username", "минималная количество символ для имя 3").isString().isLength({min:3}),
    body("password", "минималная количество символ для пароль 8").isString().isLength({min:8}),
]