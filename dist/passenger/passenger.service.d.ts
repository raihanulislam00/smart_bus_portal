import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entities';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
export declare class PassengerService {
    private readonly passengerRepository;
    constructor(passengerRepository: Repository<Passenger>);
    create(createPassengerDto: CreatePassengerDto): Promise<Passenger>;
    findByFullNameSubstring(substring: string): Promise<Passenger[]>;
    findByUsername(username: string): Promise<Passenger>;
    removeByUsername(username: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<Passenger[]>;
    findById(id: number): Promise<Passenger>;
    update(id: number, updatePassengerDto: UpdatePassengerDto): Promise<Passenger>;
    updatePhotoPath(id: number, filename: string): Promise<Passenger>;
    getPassenger(): string;
    getPassengerName(name: string): string;
}
