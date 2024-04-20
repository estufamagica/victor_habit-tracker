import { challengeRepository } from "../../infraestructure/in-memory/challenge-repository"
import { CancelChallengeHabitCommandHandler } from "./cancel-challenge-habit-command-handler"
import { challengeMother } from "../../test/challenge/challenge-mother"
import { cancelChallengeHabitCommand } from "./cancel-challenge-habit-command"
import { challengeNotFoundError } from "./challenge-not-found-error"
import { challenge } from "../../domain/challenge/challenge"
import { cancelChallengeError } from "../../domain/challenge/cancelChallengeError"
import { invalidChallengeStatusError } from "../../domain/challenge/invalidChallengeStatusError"

describe('cancelChallengeHabitCommandHandler', () => {
    let challengeRepositoryTest: challengeRepository
    let commandHandler: CancelChallengeHabitCommandHandler
    let challenge: challenge
    let challengeId: string
    let command: cancelChallengeHabitCommand

    beforeEach(() => {
        challengeRepositoryTest = new challengeRepository()
        commandHandler = new CancelChallengeHabitCommandHandler(challengeRepositoryTest)
    })

    describe('When the challenge does not exist', () => {
        //Given
        beforeEach(() => {
            challenge = challengeMother.create()
            challengeId = challenge.id
            challengeRepositoryTest.save(challenge)
            command = new cancelChallengeHabitCommand('')
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(challengeNotFoundError.withId(''))
        })
    })

    describe('When the challenge is cancelled or completed', () => {
        //Given
        beforeEach(() => {
            challenge = new challengeMother().withStatus('Completado').build()
            challengeId = challenge.id
            challengeRepositoryTest.save(challenge)
            command = new cancelChallengeHabitCommand(challengeId)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(cancelChallengeError.withStatus('Completado'))
        })

    })

    describe('When the challenge is pending or suspended', () => {
        //Given
        beforeEach(() => {
            challenge = new challengeMother().withStatus('Pendiente').build()
            challengeId = challenge.id
            challengeRepositoryTest.save(challenge)
            command = new cancelChallengeHabitCommand(challengeId)
        })

        it('should change the challenge status to cancelled', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(() => challengeRepositoryTest.findByID(challengeId).isCanceled()).toBeTruthy()
        })
    })
})