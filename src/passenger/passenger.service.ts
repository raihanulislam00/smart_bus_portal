import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Passenger } from './entities/passenger.entities';
import { CreatePassengerDto } from './dto/createPassenger.dto';
import { UpdatePassengerDto } from './dto/updatePassenger.dto';

@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>
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

    // Legacy methods for backward compatibility (if needed)
    getPassenger(): string {
        return 'Hello Nest Js';
    }

    getPassengerName(name: string): string {
        return `Hello Passenger ${name} !`;
    }
}


