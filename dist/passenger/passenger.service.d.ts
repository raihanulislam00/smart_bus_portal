import { PassengerInterface } from './interfaces/passenger.interface';
export declare class PassengerService {
    getPassenger(): string;
    getPassengerName(name: string): string;
    private passenger;
    findAll(): PassengerInterface[];
    findOne(id: number): PassengerInterface;
    create(createPassengerData: Omit<PassengerInterface, 'id' | 'createdAt'>): PassengerInterface;
    update(id: number, updatePassengerData: Partial<Omit<PassengerInterface, 'id' | 'createdAt'>>): PassengerInterface;
    remove(id: number): {
        message: string;
    };
    private getNextId;
    updatePhotoPath(id: number, filename: string): PassengerInterface;
}
