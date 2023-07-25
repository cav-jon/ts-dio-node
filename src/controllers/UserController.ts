import { Request, Response } from "express"
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (req: Request, res: Response) => {
        const user = req.body

        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ message: "Bad Request: invalid name, email or password" })
        }
        
        this.userService.createUser(user.name, user.email, user.password)
        return res.status(201).json({ message: "201 - CREATED" })

    }

    getUser = async (req: Request, res: Response) => {
        const { userId } = req.params
        const user = await this.userService.getUser(userId)
        return res.status(200).json({
            userId: user?.id_user,
            name: user?.name,
            email: user?.email
        })
    }

     deleteUser = (req: Request, res: Response) => {
         const deleteUser = this.userService.deleteUser()
         return res.status(200).json({ deleteUser })
     }

}
