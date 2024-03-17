import { challenge } from "../../domain/challenge/challenge";

export class challengeRepository{
    private repository: challenge[] = []

    save(challenge: challenge){
        this.repository.push(challenge)
    }

    findByID(id: string): challenge {
        return this.repository.find((challenge) => challenge.id === id)
    }

    findHabitChallenges(habitId: string): challenge[] {
        return this.repository.filter(challenge => challenge.habitId.includes(habitId))
    }

    isChallengeSaved(challenge: challenge): boolean {
        return this.repository.some((c) => c.id === challenge.id)
    }
}