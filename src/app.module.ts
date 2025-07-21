import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [DriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
