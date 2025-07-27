import { CreateDriverDto } from './create-driver.dto';
export declare class DriverService {
    private drivers;
    createDriver(driverDto: CreateDriverDto): {
        message: string;
        data: CreateDriverDto;
    };
    findAll(): CreateDriverDto[];
    findById(id: number): CreateDriverDto | {
        message: string;
    };
}
