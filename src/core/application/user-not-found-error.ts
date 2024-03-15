import { baseError } from "../error";

export class UserNotFound extends baseError{
    private constructor(message: string){
        super('user-not-found', message)
    }

    static withId(id: string){
        return new UserNotFound(`User with id ${id} not found`)
    }
}