import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"

describe('UserRepository', ()=>{
    let userRepository: UserRepository
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        id_user: '12345',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    } 

    beforeAll (async ()=>{
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        })
        userRepository = new UserRepository(managerMock as EntityManager)
    })

    it('Must create a new user', async ()=> {
    
       const res = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(res).toMatchObject(mockUser)
    })

    it('Must return a user ID', async ()=> {
        const res = await userRepository.getUser(mockUser.id_user)
        expect(managerMock.findOne).toHaveBeenCalled()
    })
})