import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put, 
    Query, 
    Res, 
    UploadedFile, 
    UseInterceptors, 
    ValidationPipe 
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';
import { Passenger } from './entities/passenger.entities';

@Controller('passenger')
export class PassengerController {
    constructor(private readonly passengerService: PassengerService) {}

    // Legacy endpoints for backward compatibility
    @Get('user/:name')
    getPassengerName(@Param('name') name: string): string {
        return this.passengerService.getPassengerName(name);
    }

    @Get('query')
    getPassengerWithQuery(@Query('name') name?: string): string {
        return this.passengerService.getPassengerName(name || 'world');
    }

    // Create a user
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body(ValidationPipe) createPassengerDto: CreatePassengerDto): Promise<Passenger> {
        return await this.passengerService.create(createPassengerDto);
    }

    // Retrieve all users
    @Get('all')
    async findAll(): Promise<Passenger[]> {
        return await this.passengerService.findAll();
    }

    // Retrieve users whose full name contains a specific substring
    @Get('search/fullname')
    async findByFullNameSubstring(@Query('substring') substring: string): Promise<Passenger[]> {
        if (!substring) {
            throw new BadRequestException('Substring query parameter is required');
        }
        return await this.passengerService.findByFullNameSubstring(substring);
    }

    // Retrieve a user based on their unique username
    @Get('username/:username')
    async findByUsername(@Param('username') username: string): Promise<Passenger> {
        return await this.passengerService.findByUsername(username);
    }

    // Retrieve a user by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Passenger> {
        return await this.passengerService.findById(id);
    }

    // Update a user
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updatePassengerDto: UpdatePassengerDto
    ): Promise<Passenger> {
        return await this.passengerService.update(id, updatePassengerDto);
    }

    // Remove a user based on their unique username
    @Delete('username/:username')
    @HttpCode(HttpStatus.OK)
    async removeByUsername(@Param('username') username: string): Promise<{ message: string }> {
        return await this.passengerService.removeByUsername(username);
    }

    // Remove a user by ID (additional endpoint)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        const passenger = await this.passengerService.findById(id);
        return await this.passengerService.removeByUsername(passenger.username);
    }

    // Photo upload endpoint
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('photo', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { 
            fileSize: 2 * 1024 * 1024 
        },
        storage: diskStorage({
            destination: './uploads/photos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        })
    }))
    async uploadPhoto(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Passenger> {
        if (!file) {
            throw new BadRequestException('Photo file is required and must be an image (jpg, jpeg, png, webp)');
        }
        return await this.passengerService.updatePhotoPath(id, file.filename);
    }

    // Get photo endpoint
    @Get('photo/:filename')
    getPhoto(@Param('filename') filename: string, @Res() res) {
        res.sendFile(filename, { root: './uploads/photos' });
    }
}




