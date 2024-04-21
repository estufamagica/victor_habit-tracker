import { challengeRepository } from "../../domain/challenge/challenge-repository";
import { challenge } from "../../domain/challenge/challenge";

export class challengeRepositoryInMemory implements challengeRepository{
    private repository: challenge[] = []

    save(challenge: challenge){
        this.repository.push(challenge)
    }

    findbyId(id: string): challenge {
        return this.repository.find((challenge) => challenge.challengeId === id)
    }

    /*findHabitChallenges(habitId: string): challenge[] {
        return this.repository.filter(challenge => challenge.habitId.includes(habitId))
    }*/

    isChallengeSaved(challenge: challenge): boolean {
        return this.repository.some((c) => c.challengeId === challenge.challengeId)
    }
}