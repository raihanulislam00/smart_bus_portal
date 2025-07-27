import { PassengerService } from './passenger.service';
import { PassengerInterface } from './interfaces/passenger.interface';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
export declare class PassengerController {
    private readonly passengerservice;
    constructor(passengerservice: PassengerService);
    getPassengername(name: string): string;
    getPassengerWithQuery(name: string): string;
    findAll(search?: string): PassengerInterface[];
    findOne(id: number): PassengerInterface;
    create(createPassengerData: CreatePassengerDto): PassengerInterface;
    update(id: number, updatePassengerData: UpdatePassengerDto): PassengerInterface;
    remove(id: number): void;
    uploadPhoto(id: number, file: Express.Multer.File): PassengerInterface;
    getPhoto(filename: string, res: any): void;
}
