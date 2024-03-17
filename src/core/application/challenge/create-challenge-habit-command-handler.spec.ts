import { challengeRepository } from "../../infraestructure/in-memory/challenge-repository"
import { habitRepository } from "../../infraestructure/in-memory/habit-repository"
import { createChallengeHabitCommand } from "./create-challenge-habit-command"
import { CreateChallengehabitCommandHandler } from "./create-challenge-habit-command-handler"
import { habitMother } from "../../test/habit/habit-mother"
import { challengeMother } from "../../test/challenge/challenge-mother"
import { habitNotFound } from "../habit-not-found-error"
import { duplicatedChallenge } from "./duplicated-challenge-error"
import { invalidDescriptionLength } from "../../domain/challenge/invalid-description-length-error"
import { invalidNumberTimes } from "../../domain/challenge/invalid-number-times-error"
import { invalidDates } from "../../domain/invalid-dates-error"

describe('CreateChallengehabitCommandHandler', () => {
    let habitRepositoryTest: habitRepository
    let challengeRepositoryTest: challengeRepository
    let commandHandler: CreateChallengehabitCommandHandler

    beforeEach(() => {
        habitRepositoryTest = new habitRepository()
        challengeRepositoryTest = new challengeRepository()

        commandHandler = new CreateChallengehabitCommandHandler(habitRepositoryTest,challengeRepositoryTest)
    })

    describe('When the challenge created has a non existent habit', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            challenge.description,
            challenge.numberOfTimes,
            challenge.starDate,
            challenge.deadLine
        )
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(habitNotFound.withId(command.habitId))
        })
    })

    describe('When the challenge created is duplicated', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            challenge.description,
            challenge.numberOfTimes,
            challenge.starDate,
            challenge.deadLine
        )
        
        beforeEach(() => {
            habitRepositoryTest.save(habit)
            challengeRepositoryTest.save(challenge)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(duplicatedChallenge.withId(challenge.id))
        })
    })

    describe('When the description given os too long', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            'kbjvgumkpystasxwnuodbztdpkmbcvq',
            challenge.numberOfTimes,
            challenge.starDate,
            challenge.deadLine
        )
        
        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(invalidDescriptionLength.withDescription(command.description.length))
        })
    })

    describe('When the number of times is invalid', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            challenge.description,
            0,
            challenge.starDate,
            challenge.deadLine
        )
        
        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(invalidNumberTimes.withNumber(command.times))
        })
    })

    describe('When the dates given are invalid', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const startDate = new Date(challenge.starDate.getDate() - 1)
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            challenge.description,
            challenge.numberOfTimes,
            challenge.starDate,
            startDate
        )
        
        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(invalidDates.withDates())
        })
    })
    
    describe('When the credentials for the challenge are valid and it is attached to an existent habit', () => {
        //Given
        const habit = habitMother.create()
        const challenge = new challengeMother().withHabitId(habit.id).build()
        const command = new createChallengeHabitCommand(
            challenge.id,
            challenge.habitId,
            challenge.description,
            challenge.numberOfTimes,
            challenge.starDate,
            challenge.deadLine
        )
        
        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })
        
        it('should throw an error', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(challengeRepositoryTest.isChallengeSaved(challenge)).toBeTruthy()
        })
    })
})