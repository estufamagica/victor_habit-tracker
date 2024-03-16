export class registerHabitProgressCommand{
    constructor(
        readonly id: string,
        readonly name: string, 
        readonly description: string,
        readonly frequency: number,
        readonly duration: number,
        readonly restTime: number,
        readonly userId: string,
        readonly progress: number,
        readonly wearableDeviceid: string = null,
        readonly validation: boolean = false
    ){}
}