// passenger.controller.ts
import {
  Controller, Post, Body, Get, Param, ParseIntPipe,
  UseInterceptors, UploadedFile, UsePipes, ValidationPipe
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './passenger.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  /** Create a new passenger (validate input). */
  @Post('add')
  @UsePipes(new ValidationPipe())
  addPassenger(@Body() passengerDto: PassengerDTO) {
    console.log('Adding passenger:', passengerDto);
    return this.passengerService.addPassenger(passengerDto);
  }

  /** Get all passengers. */
  @Get('all')
  getPassengers() {
    return this.passengerService.getPassengers();
  }

  /** Get one passenger by ID (e.g., GET /passenger/5). */
  @Get(':id')
  getPassengerById(@Param('id', ParseIntPipe) id: number) {
    return this.passengerService.getPassengerById(id);
  }

  /**
   * Upload a single image file (field name 'file') and return the stored filename.
   * Uses Multer diskStorage for files under './uploads':contentReference[oaicite:10]{index=10}:contentReference[oaicite:11]{index=11}.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      // Accept only common image extensions
      if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        cb(null, true);
      } else {
        // Reject other file types
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
      }
    },
    limits: { fileSize: 30_000 },  // e.g., max 30 KB
    storage: diskStorage({
      destination: './uploads',   // directory to save files
      filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Uploaded file:', file);
    return { filename: file.filename };
  }
}
