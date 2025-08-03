import { 
  Body, Controller, Delete, Get, HttpCode, HttpStatus, 
  Param, ParseIntPipe, Post, Put, Query, UsePipes, 
  ValidationPipe, UploadedFile, UseInterceptors, 
  BadRequestException, Patch 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { AdminExistPipe } from './pipes/admin-exist.pipe';
import { AdminEntity } from './entities/admin.entity';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

  @Get()
  async findAll(): Promise<AdminEntity[]> {
    return this.adminservice.findAll(); 
  }

    @Get('defaultCountry')
  async findWithDefaultCountry(): Promise<AdminEntity[]> {
    return this.adminservice.findWithDefaultCountry();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, AdminExistPipe) id: number
  ): Promise<AdminEntity> {
    return this.adminservice.findOne(id);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true, 
      disableErrorMessages: false,
    })
  )
  async create(
    @Body() createAdminData: CreateAdminDto
  ): Promise<AdminEntity> {
    return this.adminservice.create(createAdminData);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true, 
      disableErrorMessages: false,
    })
  )
  async update(
    @Param('id', ParseIntPipe, AdminExistPipe) id: number,
    @Body() updateAdminData: UpdateAdminDto,
  ): Promise<AdminEntity> {
    return this.adminservice.update(id, updateAdminData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe, AdminExistPipe) id: number
  ): Promise<void> {
    await this.adminservice.remove(id);
  }

  @Patch(':id/country')
  @HttpCode(HttpStatus.OK)
  async updateCountry(
    @Param('id', ParseIntPipe, AdminExistPipe) id: number,
    @Body('country') country: string
  ): Promise<AdminEntity> {
    return this.adminservice.updateCountry(id, country);
  }

  @Get('byJoiningDate/:date')
  async findByJoiningDate(
    @Param('date', ParseDatePipe) date: Date
  ): Promise<AdminEntity[]> {
    return this.adminservice.findByJoiningDate(date);
  }

  @Post('registerWithPhoto')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true, 
      disableErrorMessages: false,
    })
  )
  @UseInterceptors(FileInterceptor('photo', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 2 * 1024 * 1024 },
    storage: diskStorage({
      destination: './uploads/photos',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    })
  }))
  async createWithPhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createAdminData: CreateAdminDto,
  ): Promise<AdminEntity> {
    const newAdmin = await this.adminservice.create(createAdminData);
    
    if (photo) {
      return this.adminservice.updatePhotoPath(newAdmin.id, photo.filename);
    }
    
    return newAdmin;
  }
}