import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengerController],
  providers: [PassengerService]
})
export class PassengerModule {}
