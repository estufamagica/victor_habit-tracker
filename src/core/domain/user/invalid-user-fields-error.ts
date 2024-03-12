import { baseError } from "../../error";

export class invalidUserCredentials extends baseError{
    private constructor(message: string){
        super('invalid-user-credentials', message)
    }

    static emptyUsername(){
        return new invalidUserCredentials("Empty Username provided, please enter a valid username")
    }

    static emptyMail(){
        return new invalidUserCredentials("Empty Email provided, please enter a valid Email")
    }

    static emptyName(){
        return new invalidUserCredentials("Empty Name provided, please entrr a valid Name")
    }
}