import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { Driver } from './driver/entities/driver';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [DriverModule, PassengerModule, TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: '12345',
 database: 'bus_portal',
 autoLoadEntities: true,
  entities: [Driver],
 synchronize: true,
 })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}