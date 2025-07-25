import { PassengerService } from './passenger.service';
import { PassengerDTO } from './passenger.dto';
export declare class PassengerController {
    private readonly passengerService;
    constructor(passengerService: PassengerService);
    addPassenger(passengerDto: PassengerDTO): {
        fullname: string;
        password: string;
        email: string;
        filename: string;
        id: number;
    };
    getPassengers(): any[];
    getPassengerById(id: number): any;
    uploadFile(file: Express.Multer.File): {
        filename: string;
    };
}
