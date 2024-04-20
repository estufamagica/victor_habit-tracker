export class startChallengeCommand{
    constructor(
        readonly habitId: string,
        readonly objective: number,
        readonly partner: string,
        readonly project: string,
        readonly cost: number,
        readonly deadLine: Date,
        readonly usuarios: string[] = []
    ){}
}