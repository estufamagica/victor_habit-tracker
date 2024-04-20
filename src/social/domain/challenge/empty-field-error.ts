import { baseError } from "../../error";

export class emptyFieldsError extends baseError{
    private constructor(message: string){
        super('empty-fields-error', message)
    }

    static emptyFields(){
        return new emptyFieldsError('Error empty fields provided')
    }
}