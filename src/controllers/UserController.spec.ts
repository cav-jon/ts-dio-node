import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request} from "express"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"



jest.mock('../services/UserService',()=>{
    return{
        UserService: jest.fn().mockImplementation(()=>{
            return {
                createUser: jest.fn()
            }
        })
    }
})
        
describe('UserController', ()=>{
    const userController = new UserController()
    const mockResponse = makeMockResponse()
    const mockUserService = {
        createUser: jest.fn(),
        listUsers: jest.fn()
    }

    it('Must add a new user', ()=> {
        const mockRequest = {
            body: {
                name: 'Jon',
                email: 'jon@react.test',
                password:'test'
            }
        } as Request

        

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "201 - CREATED"})
    })

    it('Must throw an error with an invalid name ', ()=> {
        const mockRequest = {
            body: {
                name:'',
                email: 'jon@react.test',
                password:'test'
            }
        } as Request

        

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Bad Request: invalid name, email or password"})
    })

    it('Must throw an error with an invalid email ', ()=> {
        const mockRequest = {
            body: {
               name: 'Jon',
               email:'',
               password:'test'
            }
        } as Request

   

        const res = userController.createUser(mockRequest,mockResponse)
        
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad Request: invalid name, email or password"})
    })
    it('Must throw an error with an invalid password ', () => {
        const mockRequest = {
            body: {
                name: 'Jon',
                email: 'jon@react.test',
                password: ''
            }
        } as Request

        const res = userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad Request: invalid name, email or password" })
    })
    it('Must return an user with a userId informed', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456',
            }
        })
        userController.getUser(mockRequest, mockResponse)

        expect(mockUserService.listUsers).toHaveBeenCalledWith(mockRequest.params.userId)
        expect(mockResponse.state.status).toBe(200)
    })
})