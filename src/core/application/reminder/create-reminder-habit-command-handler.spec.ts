import { habitRepository } from "../../infraestructure/in-memory/habit-repository"
import { reminderRepository } from "../../infraestructure/in-memory/reminder-repository"
import { createReminderhabitCommandHandler } from "./create-reminder-habit-command-handler"
import { habitMother } from "../../test/habit/habit-mother"
import { reminderMother } from "../../test/reminder/reminder-mother"
import { createReminderHabitCommand } from "./create-reminder-habit-command"
import { habitNotFound } from "../habit-not-found-error"
import { maximumRemindersError } from "./maximum-reminders-error"
import { duplicatedReminder } from "./duplicated-reminder-error"
import { invalidHour } from "../../domain/reminder/invalid-hour-error"

describe('CreateReminderHabitCommandHandler', () => {
    let habitRepositoryTest: habitRepository
    let reminderRepositoryTest: reminderRepository
    let commandHandler: createReminderhabitCommandHandler

    beforeEach(() => {
        habitRepositoryTest = new habitRepository()
        reminderRepositoryTest = new reminderRepository()

        commandHandler = new createReminderhabitCommandHandler(
            habitRepositoryTest, 
            reminderRepositoryTest
        )
    })
    
    describe('When the habit does not exist', () => {
        //Given
        const habit = habitMother.create()
        const reminder = new reminderMother().withId(habit.id).build()
        const command = new createReminderHabitCommand(
            reminder.id,
            reminder.habitId,
            reminder.message,
            reminder.status,
            reminder.hour
        )
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(habitNotFound.withId(command.habitId))
        })
    })

    describe('When the habit already has the maximum reminders allowed', () => {
        //Given
        const habit = habitMother.create()
        const reminder = new reminderMother().withId(habit.id).build()
        const reminder2 = new reminderMother().withId(habit.id).withHour(11).build()
        const reminder3 = new reminderMother().withId(habit.id).withHour(12).build()
        const reminder4 = new reminderMother().withId(habit.id).withHour(13).build()
        const command = new createReminderHabitCommand(
            reminder.id,
            reminder.habitId,
            reminder.message,
            reminder.status,
            reminder.hour
        )

        beforeEach(() => {
            habitRepositoryTest.save(habit)
            reminderRepositoryTest.save(reminder2)
            reminderRepositoryTest.save(reminder3)
            reminderRepositoryTest.save(reminder4)
        })

        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(maximumRemindersError.withHabitId(command.habitId))
        })
    })

    describe('When the habit already has a reminder on that hour', () => {
        const habit = habitMother.create()
        const reminder = new reminderMother().withId(habit.id).build()
        const command = new createReminderHabitCommand(
            reminder.id,
            reminder.habitId,
            reminder.message,
            reminder.status,
            reminder.hour
        )

        beforeEach(() => {
            habitRepositoryTest.save(habit)
            reminderRepositoryTest.save(reminder)
        })

        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(duplicatedReminder.withId(command.id))
        })
    })

    describe('When the hour given is unreachable', () => {
        const habit = habitMother.create()
        const reminder = new reminderMother().withId(habit.id).build()
        const command = new createReminderHabitCommand(
            reminder.id,
            reminder.habitId,
            reminder.message,
            reminder.status,
            25
        )

        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })

        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(invalidHour.withHour(command.hour))
        })
    })

    describe('When the credentials are valid', () => {
        const habit = habitMother.create()
        const reminder = new reminderMother().withId(habit.id).build()
        const command = new createReminderHabitCommand(
            reminder.id,
            reminder.habitId,
            reminder.message,
            reminder.status,
            reminder.hour
        )

        beforeEach(() => {
            habitRepositoryTest.save(habit)
        })

        it('create the habit reminder', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(reminderRepositoryTest.isReminderSaved(reminder)).toBeTruthy()
        })
    })
})