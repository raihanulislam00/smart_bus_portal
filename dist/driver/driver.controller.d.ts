import { CreateDriverDto } from './create-driver.dto';
import { DriverService } from './driver.service';
import { Response } from 'express';
export declare class DriverController {
    private readonly driverService;
    constructor(driverService: DriverService);
    create(driverDto: CreateDriverDto, nidImage: Express.Multer.File): {
        message: string;
        data: CreateDriverDto;
    };
    getDriverById(id: number): CreateDriverDto | {
        message: string;
    };
    getAllDrivers(): CreateDriverDto[];
    getNidImage(name: string, res: Response): void;
}
