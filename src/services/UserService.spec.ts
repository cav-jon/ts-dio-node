import { User, UserService } from "./UserServices"

describe('userSerivce', () => {
    const mockDB: User[] = []
    const userSerivce = new UserService(mockDB);

    it('Add a new user', ()=>{
        const mockConsole = jest.spyOn(global.console, 'log')
        userSerivce.createUser('jon','test@test.com')
        expect(mockConsole).toHaveBeenCalledWith('Update on DB', mockDB)
    })

    it('List all users', ()=>{
        const mockList = userSerivce.listUsers()
        expect (mockList).toStrictEqual([{
            name: 'jon',
            email: 'test@test.com'
        }])
    })

    it('Delete a user', () => {
        const mockDelete = userSerivce.deleteUser()
        expect(mockDelete).toStrictEqual([{
            name: 'jon',
            email: 'test@test.com'
        }])
    })
})