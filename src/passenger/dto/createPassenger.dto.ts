import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Matches, IsIn, IsBoolean } from "class-validator";

export class CreatePassengerDto {

    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(100, { message: 'Username must not exceed 100 characters' })
    username: string;

    @IsNotEmpty({ message: 'Full name is required' })
    @IsString({ message: 'Full name must be a string' })
    @MinLength(3, { message: 'Full name must be at least 3 characters long' })
    @MaxLength(150, { message: 'Full name must not exceed 150 characters' })
    fullName: string;

    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive?: boolean;

    @IsOptional()
    @IsString({ message: 'Mail must be a string' })
    @MinLength(7, { message: 'Mail must be at least 7 characters long' })
    @MaxLength(50, { message: 'Mail must not exceed 50 characters' })
    @Matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, { message: 'Email must be a valid email address' })
    mail?: string;

    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase letter' })
    password?: string;

    @IsOptional()
    @IsString({ message: 'Gender must be a string' })
    @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
    gender?: string;

    @IsOptional()
    @IsString({ message: 'Enter Your Phone Number ' })
    @MinLength(11, { message: 'Invalid phone' })
    @MaxLength(11, { message: 'Phone must not exceed 11 digits'})
    @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    @MaxLength(200, { message: 'Address must not exceed 200 characters' })
    address?: string;
}