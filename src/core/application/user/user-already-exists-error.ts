import { baseError } from "../../error";

export class userAlreadyExistsError extends baseError{
    private constructor(message: string){
        super('user-already-exists', message)
    }

    static withUsername(username: string){
        return new userAlreadyExistsError(`User with username ${username} already exists`)
    }

    static withId(id: string){
        return new userAlreadyExistsError(`User with id ${id} already exists`)
    }
}