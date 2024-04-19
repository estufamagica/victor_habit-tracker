import { baseError } from "../../error";

export class cancelChallengeError extends baseError{
    constructor(message: string){
        super('cancel-challenge-error', message)
    }

    static withStatus(status: string){
        return new cancelChallengeError(`Challenge with status ${status} can't be cancelled`)
    }
}