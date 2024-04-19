import { invalidChallengeStatusError } from "./invalidChallengeStatusError"

const validStatus = ['Pendiente', 'Suspendido', 'Cancelado', 'Completado']

export class ChallengeStatus{
    readonly challenge_status: string
    
    constructor(status: string = 'Pendiente'){
        if(!validStatus.includes(status)){
            throw invalidChallengeStatusError.withStatus(status)
        }

        this.challenge_status = status
    }

    static Pending(): ChallengeStatus{
        return new ChallengeStatus('Pendiente')
    }

    static Suspended(): ChallengeStatus{
        return new ChallengeStatus('Suspendido')
    }

    static Cancelled(): ChallengeStatus{
        return new ChallengeStatus('Cancelado')
    }

    static Completed(): ChallengeStatus{
        return new ChallengeStatus('Completado')
    }
}