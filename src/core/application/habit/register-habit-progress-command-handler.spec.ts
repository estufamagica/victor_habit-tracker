import { habitMother } from "../../test/habit/habit-mother"
import { habitRepository } from "../../infraestructure/in-memory/habit-repository"
import { UserRepository } from "../../infraestructure/in-memory/user-repository"
import { registerHabitProgressCommandhandler } from "./register-habit-progress-command-handler"
import { userMother } from "../../test/user/user-mother"
import { registerHabitProgressCommand } from "./register-habit-progress-command"
import { invalidHabitProgress } from "../../domain/habit/invalid-habit-progress-error"
import { wearableDeviceService } from "../../domain/habit/wearable-device-service"

describe('RegisterHabitProgressCommandHandler', () => {
    let habitRepositoryTest: habitRepository
    let userRepository: UserRepository
    let commandHandler: registerHabitProgressCommandhandler

    beforeEach(() => {
        userRepository = new UserRepository()
        habitRepositoryTest = new habitRepository()

        commandHandler = new registerHabitProgressCommandhandler(
            habitRepositoryTest,
            userRepository
        )
    })

    describe('When the progress is below 0', () => {
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new registerHabitProgressCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            -8
        )

        beforeEach(() => {
            //Given
            userRepository.save(user)
        })

        it('should throw an error', () => {
            //When
            //Then
            expect(() => commandHandler.handle(command)).toThrow(invalidHabitProgress.withProgress(command.progress))
        })
    })

    describe('When the progress is above 100', () => {
        const habit = habitMother.create()
        const user = new userMother().withId(habit.userId).build()
        const command = new registerHabitProgressCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            109
        )

        beforeEach(() => {
            //Given
            userRepository.save(user)
        })

        it('should throw an error', () => {
            //When
            //Then
            expect(() => commandHandler.handle(command)).toThrow(invalidHabitProgress.withProgress(command.progress))
        })
    })

    describe('When the progress given is in the accpeted range', () => {
        const habit = new habitMother().withProgress(50).build()
        const user = new userMother().withId(habit.userId).build()
        const command = new registerHabitProgressCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            habit.progress
        )

        beforeEach(() => {
            //Given
            userRepository.save(user)
        })

        it('Register a habit with progress', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(habitRepositoryTest.findbyId(habit.id).progress).toEqual(habit.progress)
        })

    })

    //Device + progress

    describe('When the progress is created with a device', () => {
        const deviceConnection = wearableDeviceService.connect()
        const habit = new habitMother().withProgress(50).build()
        const user = new userMother().withId(habit.userId).build()
        const command = new registerHabitProgressCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            habit.progress,
            deviceConnection.deviceId
        )

        beforeEach(() => {
            //Given
            userRepository.save(user)
        })

        it('Register a habit with progress', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(habitRepositoryTest.findbyId(habit.id).progress).toEqual(habit.progress)
            expect(habitRepositoryTest.findbyId(habit.id).wearableDeviceId).toEqual(deviceConnection.deviceId)
        })
    })

    describe('When the progress is validated by the device', () => {
        const deviceConnection = wearableDeviceService.connect()
        const habit = new habitMother().withProgress(50).build()
        const user = new userMother().withId(habit.userId).build()
        const command = new registerHabitProgressCommand(
            habit.id,
            habit.name,
            habit.description,
            habit.schedule.frequency,
            habit.schedule.duration,
            habit.schedule.restTime,
            habit.userId,
            habit.progress,
            deviceConnection.deviceId,
            deviceConnection.validateProgress()
        )

        beforeEach(() => {
            //Given
            userRepository.save(user)
        })

        it('Register a habit with progress', () => {
            //When
            commandHandler.handle(command)
            //Then
            expect(habitRepositoryTest.findbyId(habit.id).progress).toEqual(habit.progress)
            expect(habitRepositoryTest.findbyId(habit.id).wearableDeviceId).toEqual(deviceConnection.deviceId)
            expect(habitRepositoryTest.findbyId(habit.id).validated).toBeTruthy()
        })
    })

})