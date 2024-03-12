import { invalidUserCredentials } from "./invalid-user-fields-error";
export class User{
    constructor(
        readonly id: string,
        readonly username: string,
        readonly email: string,
        readonly fullname: string,
        readonly creation_date: Date = new Date(),
        readonly update_date: Date = new Date(),
    ) {
        if(username.length == 0){
            throw invalidUserCredentials.emptyUsername()
        }

        if(email.length == 0){
            throw invalidUserCredentials.emptyMail()
        }

        if(fullname.length == 0){
            throw invalidUserCredentials.emptyName()
        }
    }
}