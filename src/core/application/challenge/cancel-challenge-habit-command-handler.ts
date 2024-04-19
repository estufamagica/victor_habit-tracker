import { challengeRepository } from "../../infraestructure/in-memory/challenge-repository";
import { cancelChallengeHabitCommand } from "./cancel-challenge-habit-command";
import { challengeNotFoundError } from "./challenge-not-found-error";

export class CancelChallengeHabitCommandHandler{
    constructor(
        private readonly challengeRepository: challengeRepository
    ){}

    handle(command: cancelChallengeHabitCommand){

        if(!this.challengeRepository.findByID(command.challengeId)){
            throw challengeNotFoundError.withId(command.challengeId)
        }

        this.challengeRepository.findByID(command.challengeId).cancelChallenge()
    }
}