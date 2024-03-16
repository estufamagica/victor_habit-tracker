export class createHabitCommand{
    constructor(
        readonly id: string,
        readonly name: string, 
        readonly description: string,
        readonly frequency: number,
        readonly duration: number,
        readonly restTime: number,
        readonly userId: string,
        readonly wearableDeviceid: string = null
    ){}
}