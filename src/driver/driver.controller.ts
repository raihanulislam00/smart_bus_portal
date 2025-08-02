import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { CreateDriverDto } from './create-driver.dto';
import { DriverService } from './driver.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterError } from 'multer';
import { Response } from 'express';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('file')
  /*@UsePipes(
    new ValidationPipe({
      
      forbidNonWhitelisted: true,
    }),
  )*/
  @UseInterceptors(
    FileInterceptor('nidImage', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
          return cb(
            new MulterError(
              'LIMIT_UNEXPECTED_FILE',
              'Only image files are allowed',
            ),
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
  create(
    @Body() driverDto: CreateDriverDto,
    @UploadedFile() nidImage: Express.Multer.File,
  ) {
    if (!nidImage) {
      throw new BadRequestException(
        'NID image is required and must be under 2MB',
      );
    }
    driverDto.id = Number(driverDto.id); 
    
    return this.driverService.createDriver({
      ...driverDto,
      nidImage: nidImage.filename,
    });
  }

  @Get(':id')
  getDriverById(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.findById(id);
  }

  @Get()
  getAllDrivers() {
    return this.driverService.findAll();
  }

  @Get('nid/:name')
  getNidImage(@Param('name') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: './uploads/nid' });
  }
}
