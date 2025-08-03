import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './create-driver.dto';
import { UpdateStatusDto } from './update-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterError } from 'multer';
import { Response } from 'express';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('nidImage', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
          return cb(
            new MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
      storage: diskStorage({
        destination: './uploads/nid',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createDriver(
    @Body() driverDto: CreateDriverDto,
    @UploadedFile() nidImage: Express.Multer.File,
  ) {
    if (!nidImage) {
      throw new BadRequestException('NID image is required and must be under 2MB');
    }
    driverDto.nidImage = nidImage.filename;
    return await this.driverService.createDriver(driverDto);
  }

  @Get(':id')
  getDriverById(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.findDriverById(id);
  }

  @Get()
  getAllDrivers() {
    return this.driverService.findAllDrivers();
  }

  @Get('nid/:name')
  getNidImage(@Param('name') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: './uploads/nid' });
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.driverService.updateDriverStatus(id, dto);
  }

  @Get('inactive')
  getInactiveDrivers() {
    return this.driverService.getInactiveDrivers();
  }

  @Get('older-than/:age')
  getDriversOlderThan(@Param('age', ParseIntPipe) age: number) {
    return this.driverService.getDriversOlderThan(age);
  }
}
