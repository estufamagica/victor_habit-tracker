import { eventPublisheInMemory } from "../../infraestructure/in-memory/event-publisher-in-memory"
import { registerProgressChallengeCommandhandler } from "./register-progress-challenge-command-handler"
import { challengeRepositoryInMemory } from "../../infraestructure/in-memory/challenge-repository-in-memory"
import { habitMother } from "../../test/habit/habit-mother"
import { challenge } from "../../domain/challenge/challenge"
import { v4 as uuidv4 } from 'uuid'
import { registerProgressChallengeCommand } from "./register-progress-challenge-command"


describe('registerProgressChallengeCommandHandler', () => {
    let commandHandler: registerProgressChallengeCommandhandler
    let eventPublisher: eventPublisheInMemory
    let challengeRepositoryTest: challengeRepositoryInMemory

    beforeEach(() => {
        eventPublisher = new eventPublisheInMemory()
        challengeRepositoryTest = new challengeRepositoryInMemory()
        commandHandler = new registerProgressChallengeCommandhandler(
            challengeRepositoryTest, eventPublisher
        )
    })

    describe('When we are given a progress for multiple challenges', () => {
        //Given
        const habit = habitMother.create()
        const challengeTest: challenge = challenge.createStarted(
            habit.id,
            10,
            'Dani',
            'DS2',
            100,
            [uuidv4()],
            new Date(),
            new Date()
        )
        const challengeTest2: challenge = challenge.createStarted(
            habit.id,
            20,
            'Dani',
            'DS2',
            100,
            [uuidv4()],
            new Date(),
            new Date()
        )
        const challengeTest3: challenge = challenge.createStarted(
            habit.id,
            30,
            'Dani',
            'DS2',
            100,
            [uuidv4()],
            new Date(),
            new Date()
        )

        const command = new registerProgressChallengeCommand(habit.id, 4, new Date())

        beforeEach(() => {
            challengeRepositoryTest.save(challengeTest)
            challengeRepositoryTest.save(challengeTest2)
            challengeRepositoryTest.save(challengeTest3)
        })

        it('should log the progress for all the challenges',() => {
            //When
            commandHandler.handle(command)
            //Then
            expect(challengeTest.getStatus().progress).toEqual(challengeTest.getStatus().progress + 4)
        })
    })

    describe('When the challenged is achieved', () => {
        //Given
        const habit = habitMother.create()
        const challengeTest: challenge = challenge.createStarted(
            habit.id,
            10,
            'Dani',
            'DS2',
            100,
            [uuidv4()],
            new Date(),
            new Date()
        )

        const command = new registerProgressChallengeCommand(habit.id, 10, new Date())

        beforeEach(() => {
            challengeRepositoryTest.save(challengeTest)
        })

        it('should change the challenge status to ACHIEVED', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(challengeTest.getStatus().status).toEqual('ACHIEVED')
        })
    })
})