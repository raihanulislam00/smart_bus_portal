import { DriverService } from './driver.service';
import { CreateDriverDto } from './create-driver.dto';
import { UpdateStatusDto } from './update-status.dto';
import { Response } from 'express';
export declare class DriverController {
    private readonly driverService;
    constructor(driverService: DriverService);
    createDriver(driverDto: CreateDriverDto, nidImage: Express.Multer.File): Promise<{
        message: string;
        data: CreateDriverDto;
    }>;
    getDriverById(id: number): CreateDriverDto | {
        message: string;
    };
    getAllDrivers(): Promise<import("./entities/driver").Driver[]>;
    getNidImage(name: string, res: Response): void;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<{
        message: string;
    }>;
    getInactiveDrivers(): Promise<import("./entities/driver").Driver[]>;
    getDriversOlderThan(age: number): Promise<import("./entities/driver").Driver[]>;
}
