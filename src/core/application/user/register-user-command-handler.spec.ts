import { UserRepository } from "../../infraestructure/in-memory/user-repository"
import { RegisterUserCommandHandler } from "./register-user-command-handler"
import { userMother } from "../../test/user/user-mother"
import { RegisteruserCommand } from "./register-user-command"
import { userAlreadyExistsError } from "./user-already-exists-error"
import { invalidUserCredentials } from "../../domain/user/invalid-user-fields-error"

describe('RegisterUserCommandhandler', () => {
    const prepareScenario = () => {
        const repository = new UserRepository()
        const handler = new RegisterUserCommandHandler(repository)
        return {repository, handler}
    }

    it('should register the user', () =>{
        const { repository, handler } = prepareScenario()
        //Given
        const user = userMother.create()
        //When
        const command = new RegisteruserCommand(
            user.id, 
            user.username, 
            user.email, 
            user.fullname, 
            user.creation_date, 
            user.update_date
        )

        handler.handle(command)
        //Then
        expect(repository.isuserSaved(user)).toBeTruthy()
    })

    it('should throw an error if the user already exists', ()=>{
        const { repository, handler } = prepareScenario()
        //Given
        const user = userMother.create()
        repository.save(user)
        //When
        const command = new RegisteruserCommand(
            user.id, 
            user.username, 
            user.email, 
            user.fullname, 
            user.creation_date, 
            user.update_date
        )
        //Then
        expect(() => handler.handle(command)).toThrow(
            userAlreadyExistsError.withId(command.id)
        )
    })

    it('should throw an error if the data given is incomplete', ()=>{
        const { repository, handler } = prepareScenario()
        //Given
        const user = userMother.create()
        //When
        const command = new RegisteruserCommand(
            user.id, 
            '', 
            user.email, 
            user.fullname, 
            user.creation_date, 
            user.update_date
        )
        //Then
        expect(() => handler.handle(command)).toThrow(
            invalidUserCredentials.emptyUsername()
        )
    })
})