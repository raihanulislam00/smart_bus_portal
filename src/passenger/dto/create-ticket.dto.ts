import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTicketDto {
    @IsString()
    routeName: string;

    @IsString()
    seatNumber: string;

    @IsNumber()
    price: number;

    @IsDateString()
    journeyDate: string;
}
