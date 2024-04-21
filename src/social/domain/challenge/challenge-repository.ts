import { challenge } from "./challenge";

export interface challengeRepository{
    findbyId(id: string): challenge

    //
}