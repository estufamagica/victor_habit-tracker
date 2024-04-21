export class addUsersChallengeCommand{
    constructor(
        readonly challengeId: string,
        readonly users: string[], 
        readonly date: Date
    ){}
}