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
  @IsUrl()
  socialMediaLink?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Mail is required' })
  @IsString({ message: 'Mail must be a string' })
  @MinLength(7, { message: 'Mail must be at least 7 characters long' })
  @MaxLength(50, { message: 'Mail must not exceed 50 characters' })
  mail?: string;

  @IsOptional()
  @IsString({ message: 'Country must be a string' })
  @MaxLength(30, { message: 'Country must not exceed 30 characters' })
  country?: string;
}