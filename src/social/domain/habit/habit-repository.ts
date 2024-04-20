import { habit } from "./habit";

export interface habitRepository{
    save(habit: habit): void
    findbyId(id: string): habit
    findbyName(name: string): habit
    userHasHabits(userId: string): boolean
    findUserHabits(userId: string): habit[]
    isHabitSaved(habit: habit): boolean
}