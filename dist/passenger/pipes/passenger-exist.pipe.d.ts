import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { PassengerService } from "../passenger.service";
export declare class PassengerExistPipe implements PipeTransform {
    private readonly passengerService;
    constructor(passengerService: PassengerService);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
