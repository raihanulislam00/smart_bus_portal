// passenger.dto.ts
import { IsString, Matches, IsEmail } from 'class-validator';

export class PassengerDTO {
  @IsString({ message: 'Please enter a valid name' })
  @Matches(/^[A-Za-z]+$/, { message: 'Please enter a valid name' })
  fullname: string;

  password: string;

  @IsEmail()
  email: string;

  filename: string;
}
