export class registerProgressChallengeCommand{
    constructor(
        readonly habitId: string,
        readonly progress: number,
        readonly date: Date
    ){}
}