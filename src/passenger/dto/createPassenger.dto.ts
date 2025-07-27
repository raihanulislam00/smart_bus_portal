import { IsNotEmpty, IsNumber, IsString, MaxLength, MinDate, MinLength, Matches, IsIn } from "class-validator";

export class CreatePassengerDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Name must not exceed 50 characters' })
    name: string;


    @IsNotEmpty({ message: 'mail is required' })
    @IsString({ message: 'mail must be a string' })
    @MinLength(7, { message: 'mail must be at least 7 characters long' })
    @MaxLength(50, { message: 'mail must not exceed 50 characters' })
    @Matches(/^[\w.-]+@aiub\.edu$/, { message: 'Email must be a valid aiub.edu address' })
    mail: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase letter' })
    password: string;

    @IsNotEmpty({ message: 'Gender is required' })
    @IsString({ message: 'Gender must be a string' })
    @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
    gender: string;

    @IsNotEmpty({ message: 'phone is required' })
    @IsString({ message: 'Enter Your Phone Number ' })
    @MinLength(11, { message: 'phone must be at least 11 digits long' })
    @MaxLength(11, { message: 'phone must not exceed 11 digits'})
    @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
    phone: string;

}