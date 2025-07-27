import { 
  Body, Controller, Delete, Get, HttpCode, HttpStatus, 
  Param, ParseIntPipe, Post, Put, Query, UsePipes, 
  ValidationPipe, UploadedFile, UseInterceptors, Res, 
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminService } from './admin.service';
import { Post as PostInterface } from './interfaces/post.interface';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { AdminExistPipe } from './pipes/admin-exist.pipe';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

    //@Get()
    //getAdmin() :string{
       // return this.adminservice.getAdmin();
   // }

    @Get('user/:name')
    getAdminname(@Param('name')name :string) :string{
        return this.adminservice.getAdminName(name);
    }

    @Get('query')
    getAdminWithQuery(@Query('name') name :string):string
    {
        return this.adminservice.getAdminName(name || 'world')
    }

    // @Get()
    // getAllAdmin(){
    //     return this.adminservice.getAllAdmin();
    // }

    // @Get(':id')
    // getAdminById(@Param ('id', ParseIntPipe) id:number){
    //     return this.adminservice.getAdminById(id);

    // }

    @Get()
    findAll(@Query('search') search ?:string):PostInterface[]{
        const extractAllPost = this.adminservice.findAll()
        if(search){
            return extractAllPost.filter(singlePost=>singlePost.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractAllPost;
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe, AdminExistPipe)id: number): PostInterface {
        return this.adminservice.findOne(id);
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
    create(@Body()createAdminData : CreateAdminDto): PostInterface {
        const dataToCreate = {
            ...createAdminData,
        };
        return this.adminservice.create(dataToCreate);
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
    update(@Param('id',ParseIntPipe,AdminExistPipe)id:number,
    @Body()updateAdminData:UpdateAdminDto,):PostInterface{
        const dataToUpdate = {
            ...updateAdminData,
        };
        return this.adminservice.update(id, dataToUpdate);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id',ParseIntPipe,AdminExistPipe)id:number):void{
         this.adminservice.remove(id);
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
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
      if (!file) {
        throw new BadRequestException('Photo file is required and must be an image (jpg, jpeg, png, webp)');
      }
      return this.adminservice.updatePhotoPath(id, file.filename);
  }

  
  @Get('photo/:filename')
  getPhoto(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads/photos' });
  }
}





