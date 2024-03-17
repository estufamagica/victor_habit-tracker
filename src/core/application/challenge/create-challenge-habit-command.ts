export class createChallengeHabitCommand{
    constructor(
        readonly id: string,
        readonly habitId: string,
        readonly description: string,
        readonly times: number,
        readonly startDate: Date,
        readonly deadLine: Date
    ){}
}