import { Request, Response } from "express"
import { UserService } from '../services/UserServices'

const userService = new UserService()

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (req: Request, res: Response) => {
        const user = req.body

        if (!user.name) {
            return res.status(400).json({ message: "Bad Request: invalid name" })
        }
        if (!user.email) {
            return res.status(400).json({ message: "Bad Request: invalid email" })
        }
        this.userService.createUser(user.name, user.email)
        return res.status(201).json({ message: "201 - CREATED" })

    }

    listUsers = (req: Request, res: Response) => {
        const listUsers = this.userService.listUsers()
        return res.status(200).json({ listUsers })
    }

    deleteUser = (req: Request, res: Response) => {
        const deleteUser = this.userService.deleteUser()
        return res.status(200).json({ deleteUser })
    }

}
