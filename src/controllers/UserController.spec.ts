import { UserService } from "../services/UserServices"
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request} from "express"
describe('UserController', ()=>{
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)


    it('Must add a new user', ()=> {
        const mockRequest = {
            body: {
                name: 'Jon',
                email: 'jon@react.test'
            }
        } as Request

        const mockResponse = makeMockResponse()

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "201 - CREATED"})
    })

    it('Must throw an error with an invalid name ', ()=> {
        const mockRequest = {
            body: {
                email: 'jon@react.test'
            }
        } as Request

        const mockResponse = makeMockResponse()

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Bad Request: invalid name"})
    })

    it('Must throw an error with an invalid email ', ()=> {
        const mockRequest = {
            body: {
               name: 'Jon'
            }
        } as Request

        const mockResponse = makeMockResponse()

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Bad Request: invalid email"})
    })
})