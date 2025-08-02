import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengerModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger/entities/passenger.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'passenger',
      entities: [Passenger],
      synchronize: true,
    }),
    PassengerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}