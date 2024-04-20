export class challengeProgressCommand{
    constructor(
        readonly habitId: string,
        readonly progress: number,
        readonly date: Date
    ){}
}