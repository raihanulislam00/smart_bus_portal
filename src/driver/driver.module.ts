import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver]),  // <-- This registers DriverRepository provider
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
