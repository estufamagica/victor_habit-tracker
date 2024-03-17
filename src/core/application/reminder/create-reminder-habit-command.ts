export class createReminderHabitCommand{
    constructor(
        readonly id: string,
        readonly habitId: string,
        readonly message: string,
        readonly status: boolean,
        readonly hour: number
    ){}
}