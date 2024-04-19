import { baseError } from "../../error";

export class challengeNotFoundError extends baseError{
    private constructor(message: string){
        super('challenge-not-found', message)
    }

    static withId(id: string){
        return new challengeNotFoundError(`Challenge with id ${id} not found.`)
    }
}