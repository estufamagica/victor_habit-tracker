import { baseError } from "../../error";

export class HabitsNotFound extends baseError{
    private constructor(message: string){
        super('habits-not-found', message)
    }

    static withUserId(userId: string){
        return new HabitsNotFound(`Habits not found for user with id: ${userId}`)
    }
}