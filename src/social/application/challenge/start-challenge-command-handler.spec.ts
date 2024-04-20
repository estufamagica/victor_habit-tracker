import { EventPublisher } from "../../domain/event-publisher"
import { habitRepository } from "../../domain/habit/habit-repository"
import { habitRepositoryInMemory } from "../../infraestructure/in-memory/habit-repository-in-memory"
import { startChallengeCommandHandler } from "./start-challenge-command-handler"
import { eventPublisheInMemory } from "../../infraestructure/in-memory/event-publisher-in-memory"
import { habitMother } from "../../test/habit/habit-mother"
import { startChallengeCommand } from "./start-challenge-command"
import { habitNotFound } from "../habit-not-found-error"
import { emptyFieldsError } from "../../domain/challenge/empty-field-error"
import { v4 as uuidv4 } from 'uuid'

describe('startChallengeCommandHandler', () => {
    let habitRepositoryTest: habitRepositoryInMemory
    let eventPublisherTest: eventPublisheInMemory
    let commandHandler: startChallengeCommandHandler

    beforeEach(() => {
        habitRepositoryTest = new habitRepositoryInMemory()
        eventPublisherTest = new eventPublisheInMemory()
        commandHandler = new startChallengeCommandHandler(habitRepositoryTest, eventPublisherTest)
    })

    describe('When the habitId provided does not belong to any habit', () => {
        //Given
        const habit = habitMother.create()
        const command = new startChallengeCommand(
            habit.id,
            10,
            'Dani',
            'DS',
            100,
            new Date(),
            )
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(habitNotFound.withId(habit.id))
        })
    })

    describe('When the challenge fields provided are invalid or empty', () => {
        //Given
        const habit = habitMother.create()
        const command = new startChallengeCommand(
            habit.id,
            10,
            '',
            'DS',
            100,
            new Date(),
            )

        beforeEach(()=> {
            habitRepositoryTest.save(habit)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(emptyFieldsError.emptyFields())
        })
    })

    describe('When the fields given are valid and the habit exists', () => {
        //Given
        const habit = habitMother.create()
        const command = new startChallengeCommand(
            habit.id,
            10,
            'Dani',
            'DS2',
            100,
            new Date(),
            [uuidv4()]
            )

        beforeEach(()=> {
            habitRepositoryTest.save(habit)
        })
        
        it('should throw an error', () => {
            //When
            commandHandler.handle(command)
            expect(eventPublisherTest.isEmpty()).toBeFalsy()
        })
    })
})