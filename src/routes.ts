import { Router } from 'express'
import { UserController } from './controllers/UserController'

const userController = new UserController()

export const router = Router()

router.post('/user', userController.createUser)
router.get('/user', userController.listUsers)
router.delete('/user', userController.deleteUser)