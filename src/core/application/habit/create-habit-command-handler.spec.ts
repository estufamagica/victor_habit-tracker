import { habitRepository } from "../../infraestructure/in-memory/habit-repository"
import { habitMother } from "../../test/habit/habit-mother"
import { UserRepository } from "../../infraestructure/in-memory/user-repository"
import { CreateHabitCommandhandler } from "./create-habit-command-handler"
import { userMother } from "../../test/user/user-mother"
import { createHabitCommand } from "./create-habit-command"
import { duplicatedHabitName } from "./duplicated-habit-name-error"
import { invalidHabitFields } from "../../domain/habit/invalid-habit-fields-error"
import { invalidHabitSchedule } from "../../domain/habit/invalid-habit-schedule-error"
import { UserNotFound } from "../user-not-found-error"
import { wearableDeviceService } from "../../domain/habit/wearable-device-service"

describe('CreateHabitCommandhandler', () => {
    let habitRepositoryTest: habitRepository
    let userRepository: UserRepository
    let commandHandler: CreateHabitCommandhandler

    beforeEach(() => {
        userRepository = new UserRepository()
        habitRepositoryTest = new habitRepository()

        commandHandler = new CreateHabitCommandhandler(
            habitRepositoryTest,
            userRepository
            )
    })
    
    describe('When the habit name is duplicated', () => {
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId)
        
        beforeEach(() => {
            //Given
            userRepository.save(user)
            habitRepositoryTest.save(habit)
        })

        it('should throw an error', () => {
            //When
            //Then
            expect(() => commandHandler.handle(command)).toThrow(
                duplicatedHabitName.withName(habit.name)
            )
        })
    })

    describe('When some habit information is missing', () => {
        //Given
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            '',
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId)

        //When
        beforeEach(() => {
            userRepository.save(user)
        })
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(
                invalidHabitFields.emptyName()
            )
        })
    })

    describe('When the frequency and rest time are invalid', () => {
        //Given
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            habit.name,
            habit.description,
            100,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId)
        
        //When
        beforeEach(() => {
            userRepository.save(user)
        })
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(
                invalidHabitSchedule.create(command.frequency, command.duration, command.restTime)
            )
        })
    })

    describe('When the user does not exist', () => {
        //Given
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId)
        //When
        //Then
        it('should throw an error', () => {
            expect(() => commandHandler.handle(command)).toThrow(
                UserNotFound.withId(command.userId)
            )
        })
    })

    describe('When the habit credentials are valid and the user exists', () => {
        //Given
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId)
        //When
        beforeEach(() => {
            userRepository.save(user)
            commandHandler.handle(command)
        })
        //Then
        it('should cretate the habit', () => {
            expect(() => habitRepositoryTest.isHabitSaved(habit)).toBeTruthy()
        })
    })

    //device

    describe('When the habit is created with valid credentials and with a device id', () => {
        //Given
        const deviceConnection = wearableDeviceService.connect()
        const habit = new habitMother().withWearableDevice(deviceConnection.deviceId).build()
        const user = new userMother().withId(habit.userId).build()
        const command = new createHabitCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            habit.wearableDeviceId
            )
        
        beforeEach(() => {
            userRepository.save(user)
        })
        
        it('should create a habit with a device id', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(() => habitRepositoryTest.isHabitSaved(habit)).toBeTruthy()
            expect(habitRepositoryTest.findbyId(habit.id).wearableDeviceId).toEqual(deviceConnection.deviceId)
        })
    })
})