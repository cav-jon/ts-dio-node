import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database',()=>{
    initalize: jest.fn()
})
jest.mock ('jsonwebtoken')

const mockUser = {
    id_user: '123456',
    name: 'jon',
    email: 'jon@test.com',
    password: '123456'
}
const mockUserRepository = require('../repositories/UserRepository')

describe('userSerivce', () => {

    const userService = new UserService(mockUserRepository)

    it('Add a new user', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const res = await userService.createUser('jon', 'test@test.com', '12345')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(res).toMatchObject(mockUser)
    })
    it('Must return an user token',async () => {
        jest.spyOn(userService,'getAuthenticatedUser').mockImplementation(()=> Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(()=> 'token')
        const token = await userService.getToken('email', 'password')
        expect(token).toBe('token')
    })
    it('Must throw an error with an invalid user',async () => {
       jest.spyOn(userService,'getAuthenticatedUser').mockImplementation(()=>Promise.resolve(null))
        await expect(userService.getToken('mock@user.com', 'dummy')).rejects.toThrowError('Email or password is invalid!')
    })
    
    // it('List all users', ()=>{
    //     const mockList = userService.listUsers()
    //     expect (mockList).toStrictEqual([{
    //         name: 'jon',
    //         email: 'test@test.com'
    //     }])
    // })

    // it('Delete a user', () => {
    //     const mockDelete = userSerivce.deleteUser()
    //     expect(mockDelete).toStrictEqual([{
    //         name: 'jon',
    //         email: 'test@test.com'
    //     }])
    // })
})