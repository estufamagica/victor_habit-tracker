import { habitMother } from "../../test/habit/habit-mother"
import { challenge } from "../../domain/challenge/challenge"
import { eventPublisheInMemory } from "../../infraestructure/in-memory/event-publisher-in-memory"
import { addUsersChallengeCommand } from "./add-users-challenge-command"
import { addUsersChallengeCommandHandler } from "./add-users-challenge-command-handler"
import { challengeRepositoryInMemory } from "../../infraestructure/in-memory/challenge-repository-in-memory"
import { challengeNotFoundError } from "./challenge-not-found-error"
import { emptyFieldsError } from "../../domain/challenge/empty-field-error"
import { v4 as uuidv4 } from 'uuid'
import { addUsersEvent } from "../../domain/challenge/add-users-event"

describe('addUsersChallengeCommandHandler', () => {
    let commandHandler: addUsersChallengeCommandHandler
    let eventPublisher: eventPublisheInMemory
    let challengeRepositoryTest: challengeRepositoryInMemory
    
    beforeEach(() => {
        eventPublisher = new eventPublisheInMemory()
        challengeRepositoryTest = new challengeRepositoryInMemory()
        commandHandler = new addUsersChallengeCommandHandler(
            challengeRepositoryTest,
            eventPublisher
        )
    })

    describe('When the id given does not belong to any challenge', () => {
        //Given
        const habit = habitMother.create()
        const challengeTest: challenge = challenge.createStarted(
            habit.id,
            10,
            'Dani',
            'DS2',
            100,
            [],
            new Date(),
            new Date()
        )
        const command: addUsersChallengeCommand = new addUsersChallengeCommand(
            challengeTest.challengeId,
            ['',''],
            new Date()
        )
        //When
        //Then
        it('should throw an error', ()=>{
            expect(() => commandHandler.handle(command)).toThrow(challengeNotFoundError.withId(command.challengeId))
        })
    })

    describe('When the fields given are empty or invalid', () => {
        //Given
        const habit = habitMother.create()
        const challengeTest: challenge = challenge.createStarted(
            habit.id,
            10,
            'Dani',
            'DS2',
            100,
            [],
            new Date(),
            new Date()
        )
        const command: addUsersChallengeCommand = new addUsersChallengeCommand(
            challengeTest.challengeId,
            [],
            new Date()
        )

        beforeEach(() => {
            challengeRepositoryTest.save(challengeTest)
        })
        //When
        //Then
        it('should throw an error', ()=>{
            expect(() => commandHandler.handle(command)).toThrow(emptyFieldsError.emptyFields())
        })
    })

    describe('When the fields given are valid', () => {
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
        const command: addUsersChallengeCommand = new addUsersChallengeCommand(
            challengeTest.challengeId,
            [uuidv4(), uuidv4()],
            new Date()
        )

        beforeEach(() => {
            challengeRepositoryTest.save(challengeTest)
        })
        
        it('should add the users', ()=>{
            //When
            commandHandler.handle(command)
            //Then
            expect(() => eventPublisher.isEmpty()).toBeFalsy()
        })
    })
})