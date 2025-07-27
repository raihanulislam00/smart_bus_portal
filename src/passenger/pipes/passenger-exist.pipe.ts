import { ArgumentMetadata, Injectable, PipeTransform, NotFoundException } from "@nestjs/common";
import { PassengerService } from "../passenger.service";

@Injectable()
export class PassengerExistPipe implements PipeTransform {
    constructor(private readonly passengerService: PassengerService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const passenger = await this.passengerService.findOne(value);
            if (!passenger) {
                throw new NotFoundException(`Passenger with ID ${value} does not exist.`);
            }
        } catch (error) {
            throw new NotFoundException(`Passenger with ID ${value} does not exist.`);
        }
        return value;
    }
}
