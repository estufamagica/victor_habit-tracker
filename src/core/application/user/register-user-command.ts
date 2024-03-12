export class RegisteruserCommand{
    constructor(
        readonly id: string,
        readonly username: string,
        readonly email: string,
        readonly fullname: string,
        readonly creation_date: Date = new Date(),
        readonly update_date: Date = new Date(),
    ){}
}