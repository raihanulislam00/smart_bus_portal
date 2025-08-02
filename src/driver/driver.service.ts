import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDriverDto } from './create-driver.dto';
import { UpdateStatusDto } from './update-status.dto';
import { Driver } from './entities/driver';

@Injectable()
export class DriverService {
  private drivers: CreateDriverDto[] = [];

  constructor(
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
  ) {}

  // ========== In-Memory Operations ==========
  async createDriver(driverDto: CreateDriverDto) {
    await this.driverRepo.save(driverDto);
    return {
      message: 'Driver created successfully',
      data: driverDto,
    };
  }

  findAllDrivers() {
    return this.driverRepo.find(
        { where: { status: 'inactive' } }
    );
  }

  findDriverById(id: number) {
    const driver = this.drivers.find((d) => d.id === id);
    if (!driver) {
      return { message: 'Driver not found' };
    }
    return driver;
  }

  // ========== Database Operations ==========
  createDriverInDB(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepo.create(createDriverDto);
    return this.driverRepo.save(driver);
  }

  async updateDriverStatus(id: number, dto: UpdateStatusDto) {
    const result = await this.driverRepo.update(id, { status: dto.status });
    return result.affected
      ? { message: 'Status updated' }
      : { message: 'Driver not found' };
  }

  getInactiveDrivers() {
    return this.driverRepo.find({ where: { status: 'inactive' } });
  }

  getDriversOlderThan(age: number) {
    return this.driverRepo
      .createQueryBuilder('driver')
      .where('driver.age > :age', { age })
      .getMany();
  }
}
