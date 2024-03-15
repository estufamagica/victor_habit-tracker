import { habit } from "../../domain/habit/habit";

export class habitRepository{
    private repository: habit[] = []

    save(habit: habit){
        this.repository.push(habit)
    }

    findbyId(id: string):habit {
        return this.repository.find((habit) => habit.id === id)
    }

    findbyName(name: string): habit {
        return this.repository.find((habit) => habit.name === name)
    }

    userHasHabits(userId: string): boolean{
        return this.repository.some((h) => h.userId === userId)
    }

    findUserHabits(userId: string): habit[] {
        return this.repository.filter(habit => habit.userId.includes(userId))
    }

    isHabitSaved(habit: habit): boolean {
        return this.repository.some((h) => h.id === habit.id)
    }
}