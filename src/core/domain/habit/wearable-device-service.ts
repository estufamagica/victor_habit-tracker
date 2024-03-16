import { DomainService } from "../domain-service";
import { v4 as uuidv4 } from 'uuid'


export class wearableDeviceService extends DomainService{
    readonly deviceId: string = uuidv4()
    
    private constructor(){
        super('wearable-service')
    }

    static connect(){
        return new wearableDeviceService()
    }

    validateProgress(): boolean{ return true }
}