import { User } from '../../domain/user/user'
import { v4 as uuidv4 } from 'uuid'


export class userMother {
    private id: string = uuidv4()
    private username: string = 'username'
    private email: string = 'email'
    private fullname: string = 'fullname'

    build(): User {
        return new User(this.id, this.username, this.email, this.fullname)
    }

    static create(): User {
        return new userMother().build()
    }
}