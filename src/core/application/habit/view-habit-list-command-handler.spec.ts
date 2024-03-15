import { UserRepository } from "../../infraestructure/in-memory/user-repository"
import { habitRepository } from "../../infraestructure/in-memory/habit-repository"
import { viewHabitCommandhandler } from "./view-habit-list-command-handler"
import { User } from "../../domain/user/user"
import { habit } from "../../domain/habit/habit"
import { viewHabitListCommand } from "./view-habit-list-command"
import { userMother } from "../../test/user/user-mother"
import { habitMother } from "../../test/habit/habit-mother"
import { UserNotFound } from "../user-not-found-error"
import { HabitsNotFound } from "./habits-not-found-error"

describe('ViewHabitListCommandhandler', () => {
    let HabitRepository: habitRepository
    let userRepository: UserRepository
    let commandHandler: viewHabitCommandhandler
    let user: User
    let userHabit: habit
    let command: viewHabitListCommand

    beforeEach(() => {
        HabitRepository = new habitRepository()
        userRepository = new UserRepository()
        commandHandler = new viewHabitCommandhandler(HabitRepository, userRepository)
    })

    describe('When the user does not exist', () => {
        beforeEach(() => {
            //Given
            userHabit = habitMother.create()
            user = new userMother().withId(userHabit.userId).build()
            HabitRepository.save(userHabit)
            command = new viewHabitListCommand(user.id)
        })
        //When

        it('should throw an error', () => {
            //Then
            expect(() => commandHandler.handle(command)).toThrow(UserNotFound.withId(user.id))
        })
    })

    describe('When the user has no habits', () => {
        beforeEach(() => {
            //Given
            userHabit = habitMother.create()
            user = new userMother().withId(userHabit.userId).build()
            userRepository.save(user)
            command = new viewHabitListCommand(user.id)
        })
        //When

        it('should throw an error', () => {
            //Then
            expect(() => commandHandler.handle(command)).toThrow(HabitsNotFound.withUserId(userHabit.userId))
        })
    })

    describe('When the user exists and has habits', () => {
        let result: habit[]
        
        beforeAll(() => {
            //Given
            userHabit = habitMother.create()
            user = new userMother().withId(userHabit.userId).build()
            HabitRepository.save(userHabit)
            userRepository.save(user)
            command = new viewHabitListCommand(user.id)
            //When
            result = commandHandler.handle(command)
        })

        it('should not return an empty list', () => {
            //Then
            expect(result.length).not.toBe(0)
        })

        it('should return the habit list', () => {
            //Then
            expect(result.find((h) => h.id === userHabit.id)).toBeTruthy()
        })
    })
})