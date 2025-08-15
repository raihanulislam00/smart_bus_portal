import { IsString, IsIn } from 'class-validator';

export class UpdateTicketStatusDto {
    @IsString()
    @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
    status: string;
}
