export interface User
    {
        name: string,
        email: string
    }
const db = [{
    name: "Jon",
    email: "jon@react.test"
}]

export class UserService {
        
    db: User[]
    constructor(database = db){
        this.db = database
    }
    createUser = (name:string, email:string) =>{
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log('Update on DB', this.db)
    }

    listUsers = () =>{
        return this.db
    }

    deleteUser = () => {
        return this.db
    }
}
