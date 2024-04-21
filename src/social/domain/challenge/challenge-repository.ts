import { challenge } from "./challenge";

export interface challengeRepository{
    save(challenge: challenge)
    findbyId(id: string): challenge
    findHabitChallenges(habitId: string): challenge[]
    
}