import { baseError } from "../../error";

export class invalidDescriptionLength extends baseError{
    private constructor(message: string){
        super('invalid-description-length', message)
    }

    static withDescription(description_lenght: number){
        return new invalidDescriptionLength(`Invalid description lenght: ${description_lenght}. Please enter a description of 30 characters or less.`)
    }
}