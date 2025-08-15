import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengerModule } from './passenger/passenger.module';
import { Driver } from './driver/entities/driver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger/entities/passenger.entities';
import { Ticket } from './passenger/entities/ticket.entity';
import { DriverModule } from './driver/driver.module';
//import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DriverModule,
    PassengerModule,
    TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: '12345678',
 database: 'passenger',
 autoLoadEntities: true,
  entities: [Driver, Passenger, Ticket],
 synchronize: true,
 })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}