import { baseError } from "../../error";

export class duplicatedChallenge extends baseError{
    private constructor(message: string){
        super('duplicated-challenge', message)
    }

    static withId(id: string){
        return new duplicatedChallenge(`Challenge duplicated with id: ${id}.`)
    }
}