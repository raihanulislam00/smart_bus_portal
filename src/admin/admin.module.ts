import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
//import { AppModule } from 'src/app.module';

@Module({
  //imports :[AppModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
