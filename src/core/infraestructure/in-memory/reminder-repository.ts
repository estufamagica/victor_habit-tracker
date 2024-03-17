import { reminder } from "../../domain/reminder/reminder";

export class reminderRepository{
    private repository: reminder[] = []

    save(reminder: reminder){
        this.repository.push(reminder)
    }

    findById(id : string): reminder{
        return this.repository.find((r) => r.id === id)
    }

    findHabitReminders(habitId: string): reminder[] {
        return this.repository.filter(reminder => reminder.habitId.includes(habitId))
    }

    isReminderDuplicated(habitId: string, hour: number): boolean{
        return this.repository.filter(reminder => reminder.habitId === habitId && reminder.hour === hour).length > 0
    }

    isReminderSaved(reminder: reminder): boolean{
        return this.repository.some((r) => r.id === reminder.id)
    }
}