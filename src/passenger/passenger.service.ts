import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Passenger } from './entities/passenger.entities';
import { Ticket } from './entities/ticket.entity';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './services/email.service';

@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>,
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {}

    // Create a user
    async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
        try {
            // Check if username already exists
            const existingUser = await this.passengerRepository.findOne({
                where: { username: createPassengerDto.username }
            });

            if (existingUser) {
                throw new ConflictException(`Username '${createPassengerDto.username}' already exists`);
            }

            const passenger = this.passengerRepository.create({
                ...createPassengerDto,
                isActive: createPassengerDto.isActive ?? false // Default to false as per requirement
            });

            return await this.passengerRepository.save(passenger);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new Error(`Failed to create passenger: ${error.message}`);
        }
    }

    // Retrieve users whose full name contains a specific substring
    async findByFullNameSubstring(substring: string): Promise<Passenger[]> {
        if (!substring || substring.trim() === '') {
            throw new Error('Search substring cannot be empty');
        }

        return await this.passengerRepository.find({
            where: {
                fullName: Like(`%${substring}%`)
            },
            order: {
                fullName: 'ASC'
            }
        });
    }

    // Retrieve a user based on their unique username
    async findByUsername(username: string): Promise<Passenger> {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }

        const passenger = await this.passengerRepository.findOne({
            where: { username }
        });

        if (!passenger) {
            throw new NotFoundException(`Passenger with username '${username}' not found`);
        }

        return passenger;
    }

    // Remove a user based on their unique username
    async removeByUsername(username: string): Promise<{ message: string }> {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }

        const passenger = await this.passengerRepository.findOne({
            where: { username }
        });

        if (!passenger) {
            throw new NotFoundException(`Passenger with username '${username}' not found`);
        }

        await this.passengerRepository.remove(passenger);
        return { message: `Passenger with username '${username}' has been deleted` };
    }

    // Additional utility methods
    async findAll(): Promise<Passenger[]> {
        return await this.passengerRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async findById(id: number): Promise<Passenger> {
        const passenger = await this.passengerRepository.findOne({
            where: { id }
        });

        if (!passenger) {
            throw new NotFoundException(`Passenger with ID ${id} not found`);
        }

        return passenger;
    }

    async update(id: number, updatePassengerDto: UpdatePassengerDto): Promise<Passenger> {
        const passenger = await this.findById(id);

        // Check if username is being updated and if it already exists
        if (updatePassengerDto.username && updatePassengerDto.username !== passenger.username) {
            const existingUser = await this.passengerRepository.findOne({
                where: { username: updatePassengerDto.username }
            });

            if (existingUser) {
                throw new ConflictException(`Username '${updatePassengerDto.username}' already exists`);
            }
        }

        Object.assign(passenger, updatePassengerDto);
        return await this.passengerRepository.save(passenger);
    }

    async updatePhotoPath(id: number, filename: string): Promise<Passenger> {
        const passenger = await this.findById(id);
        passenger.photoPath = filename;
        return await this.passengerRepository.save(passenger);
    }

    async login(loginDto: LoginDto) {
        const passenger = await this.passengerRepository.findOne({
            where: { username: loginDto.username }
        });

        if (!passenger) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await passenger.validatePassword(loginDto.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: passenger.username, sub: passenger.id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            passenger: {
                id: passenger.id,
                username: passenger.username,
                fullName: passenger.fullName
            }
        };
    }

    // Ticket related methods
    async createTicket(passengerId: number, createTicketDto: CreateTicketDto): Promise<Ticket> {
        const passenger = await this.findById(passengerId);
        
        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            passenger
        });

        const savedTicket = await this.ticketRepository.save(ticket);

        // Send confirmation email if passenger has email
        if (passenger.mail) {
            await this.emailService.sendTicketConfirmation(passenger.mail, {
                ticketId: savedTicket.id.toString(),
                journeyDate: savedTicket.journeyDate,
                destination: savedTicket.routeName,
                seatNumber: savedTicket.seatNumber,
            });
        }

        return savedTicket;
    }

    async getPassengerTickets(passengerId: number): Promise<Ticket[]> {
        const passenger = await this.passengerRepository.findOne({
            where: { id: passengerId },
            relations: ['tickets']
        });

        if (!passenger) {
            throw new NotFoundException(`Passenger with ID ${passengerId} not found`);
        }

        return passenger.tickets;
    }

    async cancelTicket(passengerId: number, ticketId: number): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId, passenger: { id: passengerId } },
            relations: ['passenger']
        });

        if (!ticket) {
            throw new NotFoundException(`Ticket not found or does not belong to passenger`);
        }

        ticket.status = 'cancelled';
        return await this.ticketRepository.save(ticket);
    }

    async updateTicketStatus(ticketId: number, status: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
            relations: ['passenger']
        });

        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
        }

        ticket.status = status;
        return await this.ticketRepository.save(ticket);
    }

    // Legacy methods for backward compatibility (if needed)
    getPassenger(): string {
        return 'Hello Nest Js';
    }

    getPassengerName(name: string): string {
        return `Hello Passenger ${name} !`;
    }
}


