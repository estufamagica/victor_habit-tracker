import { Inject, Injectable } from "@nestjs/common";
import { RegisteruserCommand } from "./register-user-command";
import { UserRepository } from "../../infraestructure/in-memory/user-repository";
import { User } from '../../domain/user/user'
import { userAlreadyExistsError } from "./user-already-exists-error";

@Injectable()
export class RegisterUserCommandHandler{
    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
    ){}

    handle(command: RegisteruserCommand){
        
        if(this.repository.findById(command.id)){
            throw userAlreadyExistsError.withId(command.id)
        }

        if(this.repository.findByUsername(command.username)){
            throw userAlreadyExistsError.withUsername(command.username)
        }

        const user = new User(command.id, command.username, command.email, command.fullname)

        this.repository.save(user)
    }
}