import { IsNotEmpty, IsNumber, IsString, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Name must not exceed 50 characters' })
    name: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    @MaxLength(150, { message: 'Content must not exceed 150 characters' })
    content: string;

    @IsNotEmpty({ message: 'mail is required' })
    @IsString({ message: 'mail must be a string' })
    @MinLength(7, { message: 'mail must be at least 7 characters long' })
    @MaxLength(50, { message: 'mail must not exceed 50 characters' })
    mail: string;

    
    @IsNotEmpty({ message: 'phone is required' })
    @IsString({ message: 'Enter Your Phone Number ' })
    @MinLength(11, { message: 'phone must be at least 11 digits long' })
    @MaxLength(11, { message: 'phone must not exceed 11 digits'})
    phone: string;

}