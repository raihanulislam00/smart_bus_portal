import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './create-driver.dto';

@Injectable()
export class DriverService {
  private drivers: CreateDriverDto[] = []; 
    createDriver(driverDto : CreateDriverDto) {
        
        this.drivers.push(driverDto);
        return {
            message: 'Driver created successfully',
            data: driverDto,
        };
    }
    findAll() {
        return this.drivers;
    }
    findById(id: number) {
        const driver = this.drivers.find(driver => driver.id === id);
        if (!driver) {
            return { message: 'Driver not found' };
        }
        return driver;
    }
}
