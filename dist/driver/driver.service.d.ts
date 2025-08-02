import { Repository } from 'typeorm';
import { CreateDriverDto } from './create-driver.dto';
import { UpdateStatusDto } from './update-status.dto';
import { Driver } from './entities/driver';
export declare class DriverService {
    private driverRepo;
    private drivers;
    constructor(driverRepo: Repository<Driver>);
    createDriver(driverDto: CreateDriverDto): Promise<{
        message: string;
        data: CreateDriverDto;
    }>;
    findAllDrivers(): Promise<Driver[]>;
    findDriverById(id: number): CreateDriverDto | {
        message: string;
    };
    createDriverInDB(createDriverDto: CreateDriverDto): Promise<Driver>;
    updateDriverStatus(id: number, dto: UpdateStatusDto): Promise<{
        message: string;
    }>;
    getInactiveDrivers(): Promise<Driver[]>;
    getDriversOlderThan(age: number): Promise<Driver[]>;
}
