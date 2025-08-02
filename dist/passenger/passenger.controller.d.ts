import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
import { Passenger } from './entities/passenger.entities';
export declare class PassengerController {
    private readonly passengerService;
    constructor(passengerService: PassengerService);
    getPassengerName(name: string): string;
    getPassengerWithQuery(name?: string): string;
    create(createPassengerDto: CreatePassengerDto): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    findByFullNameSubstring(substring: string): Promise<Passenger[]>;
    findByUsername(username: string): Promise<Passenger>;
    findById(id: number): Promise<Passenger>;
    update(id: number, updatePassengerDto: UpdatePassengerDto): Promise<Passenger>;
    removeByUsername(username: string): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    uploadPhoto(id: number, file: Express.Multer.File): Promise<Passenger>;
    getPhoto(filename: string, res: any): void;
}
