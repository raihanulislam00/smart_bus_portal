import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, Search, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerInterface } from './interfaces/passenger.interface';
import { first } from 'rxjs';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
import { PassengerExistPipe } from './pipes/passenger-exist.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';

@Controller('passenger')
export class PassengerController {
    constructor(private readonly passengerservice : PassengerService){}

    @Get('user/:name')
    getPassengername(@Param('name')name :string) :string{
        return this.passengerservice.getPassengerName(name);
    }

    @Get('query')
    getPassengerWithQuery(@Query('name') name :string):string
    {
        return this.passengerservice.getPassengerName(name || 'world')
    }
    @Get()
    findAll(@Query('search') search ?:string):PassengerInterface[]{
        const extractAllPost = this.passengerservice.findAll()
        if(search){
            return extractAllPost.filter(singlePost=>singlePost.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractAllPost;
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe, PassengerExistPipe)id: number): PassengerInterface {
        return this.passengerservice.findOne(id);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(
        new ValidationPipe({
            whitelist: true, 
            forbidNonWhitelisted: true,
            transform: true, 
            disableErrorMessages: false, // Enable error messages
        }
    ))
    create(@Body()createPassengerData : CreatePassengerDto): PassengerInterface {
        const dataToCreate = {
            ...createPassengerData,
            phone: String(createPassengerData.phone)
        };
        return this.passengerservice.create(dataToCreate);
    }
    @Put(':id')
    @UsePipes(
        new ValidationPipe({
            whitelist: true, 
            forbidNonWhitelisted: true,
            transform: true, 
            disableErrorMessages: false, // Enable error messages
        }
    ))
    update(@Param('id',ParseIntPipe,PassengerExistPipe)id:number,
    @Body()updatePassengerData:UpdatePassengerDto,):PassengerInterface{
        const dataToUpdate = {
            ...updatePassengerData,
            phone: updatePassengerData.phone !== undefined ? String(updatePassengerData.phone) : undefined
        };
        return this.passengerservice.update(id, dataToUpdate);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id',ParseIntPipe,PassengerExistPipe)id:number):void{
         this.passengerservice.remove(id);
    }
    
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('photo', 
      {
        fileFilter: (req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
            cb(null, true);
          } else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
          }
        },
        limits: { 
          fileSize: 2 * 1024 * 1024 // 2MB 
        },
        storage: diskStorage({
          destination: './uploads/photos',
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
          },
        })
      }
    ))
    uploadPhoto(
      @Param('id', ParseIntPipe, PassengerExistPipe) id: number,
      @UploadedFile() file: Express.Multer.File
    ) {
      if (!file) {
        throw new BadRequestException('Photo file is required and must be an image (jpg, jpeg, png, webp)');
      }
      return this.passengerservice.updatePhotoPath(id, file.filename);
    }
  
    @Get('photo/:filename')
    getPhoto(@Param('filename') filename: string, @Res() res) {
      res.sendFile(filename, { root: './uploads/photos' });
    }
  }




