import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  Min,
  Matches,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateDriverDto {
//  @IsInt({ message: 'ID must be an integer' })
@IsNotEmpty({ message: 'Name is required' })
  id: number;

  @IsString()
  @MaxLength(100)
  fullName: string;

  @Type(() => Number) // 👈 THIS WILL CONVERT string to number
  @IsInt({ message: 'Age must be an integer number' })
  @Min(0, { message: 'Age must not be less than 0' })
  age: number;

  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets',
  })
  name: string;

 /* @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be at least 18' })
  age: number;*/

 /* @IsInt({ message: 'Experience must be an integer' })
  @Min(0, { message: 'Experience must be 0 or greater' })
  experiences: number;*/

  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[^@]+@[^@]+\.xyz$/, {
    message: 'Email must be a valid .xyz domain',
  })
  email: string;

  @IsNotEmpty({ message: 'NID is required' })
  @Matches(/^\d{10,13}$/, {
    message: 'NID must be between 10 to 13 digits , and nid must have number ,',
  })
  nid: string;

  @IsOptional()
  nidImage?: string;
}
