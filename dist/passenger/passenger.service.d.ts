import { PassengerDTO } from './passenger.dto';
export declare class PassengerService {
    private passengers;
    private idCounter;
    addPassenger(passenger: PassengerDTO): {
        fullname: string;
        password: string;
        email: string;
        filename: string;
        id: number;
    };
    getPassengers(): any[];
    getPassengerById(id: number): any;
}
