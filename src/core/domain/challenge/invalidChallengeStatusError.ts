import { baseError } from "../../error";

export class invalidChallengeStatusError extends baseError{
    private constructor(message: string){
        super('invalid-challenge-status', message)
    }

    static withStatus(status: string){
        return new invalidChallengeStatusError(`Invalid status ${status} provided`)
    }
}