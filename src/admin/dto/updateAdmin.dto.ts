import { 
  IsNotEmpty, IsString, MaxLength, MinLength, IsUrl, 
  IsDateString, IsOptional, Matches 
} from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s]*$/, { 
    message: 'Name must contain only letters and spaces' 
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[@#$&].*/, { 
    message: 'Password must contain at least one of these special characters: @, #, $, or &' 
  })
  password?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsUrl()
  socialMediaLink?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @MaxLength(150, { message: 'Content must not exceed 150 characters' })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Mail is required' })
  @IsString({ message: 'Mail must be a string' })
  @MinLength(7, { message: 'Mail must be at least 7 characters long' })
  @MaxLength(50, { message: 'Mail must not exceed 50 characters' })
  mail?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  @MinLength(11, { message: 'Phone must be at least 11 digits long' })
  @MaxLength(11, { message: 'Phone must not exceed 11 digits'})
  phone?: string;
}