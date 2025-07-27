import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
//import { AppModule } from 'src/app.module';

@Module({
  //imports :[AppModule],
  controllers: [PassengerController],
  providers: [PassengerService]
})
export class PassengerModule {}
