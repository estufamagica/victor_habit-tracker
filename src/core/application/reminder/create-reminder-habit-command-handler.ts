import { reminder } from "../../domain/reminder/reminder";
import { habitRepository } from "../../infraestructure/in-memory/habit-repository";
import { reminderRepository } from "../../infraestructure/in-memory/reminder-repository";
import { habitNotFound } from "../habit-not-found-error";
import { createReminderHabitCommand } from "./create-reminder-habit-command";
import { duplicatedReminder } from "./duplicated-reminder-error";
import { maximumRemindersError } from "./maximum-reminders-error";

export class createReminderhabitCommandHandler{
    constructor(
        private readonly habitRepository: habitRepository,
        private readonly reminderRepository: reminderRepository
    ){}

    handle(command: createReminderHabitCommand){

        if(!this.habitRepository.findbyId(command.habitId)){
            throw habitNotFound.withId(command.habitId)
        }

        if(this.reminderRepository.findHabitReminders(command.habitId).length >= 3){
            throw maximumRemindersError.withHabitId(command.habitId)
        }

        if(this.reminderRepository.isReminderDuplicated(command.habitId, command.hour)){
            throw duplicatedReminder.withId(command.id)
        }

        this.reminderRepository.save(
            reminder.create(
                command.id,
                command.habitId,
                command.message,
                command.status,
                command.hour
            )
        )
    }
}