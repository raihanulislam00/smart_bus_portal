import { 
  IsNotEmpty, IsString, MaxLength, MinLength, IsUrl, 
  IsDateString, Matches 
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s]*$/, { 
    message: 'Name must contain only letters and spaces' 
  })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[@#$&].*/, { 
    message: 'Password must contain at least one of these special characters: @, #, $, or &' 
  })
  password: string;

  @IsNotEmpty({ message: 'Birth date is required' })
  @IsDateString()
  birthDate: Date;

  @IsUrl()
  socialMediaLink: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @MaxLength(150, { message: 'Content must not exceed 150 characters' })
  content: string;

  @IsNotEmpty({ message: 'Mail is required' })
  @IsString({ message: 'Mail must be a string' })
  @MinLength(7, { message: 'Mail must be at least 7 characters long' })
  @MaxLength(50, { message: 'Mail must not exceed 50 characters' })
  mail: string;
}