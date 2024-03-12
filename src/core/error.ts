export abstract class baseError extends Error{
    protected constructor(
        readonly code: string,
        readonly message: string,
    ){
        super(message)
    }
}