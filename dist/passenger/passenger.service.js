"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const passenger_entities_1 = require("./entities/passenger.entities");
let PassengerService = class PassengerService {
    passengerRepository;
    constructor(passengerRepository) {
        this.passengerRepository = passengerRepository;
    }
    async create(createPassengerDto) {
        try {
            const existingUser = await this.passengerRepository.findOne({
                where: { username: createPassengerDto.username }
            });
            if (existingUser) {
                throw new common_1.ConflictException(`Username '${createPassengerDto.username}' already exists`);
            }
            const passenger = this.passengerRepository.create({
                ...createPassengerDto,
                isActive: createPassengerDto.isActive ?? false
            });
            return await this.passengerRepository.save(passenger);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new Error(`Failed to create passenger: ${error.message}`);
        }
    }
    async findByFullNameSubstring(substring) {
        if (!substring || substring.trim() === '') {
            throw new Error('Search substring cannot be empty');
        }
        return await this.passengerRepository.find({
            where: {
                fullName: (0, typeorm_2.Like)(`%${substring}%`)
            },
            order: {
                fullName: 'ASC'
            }
        });
    }
    async findByUsername(username) {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        const passenger = await this.passengerRepository.findOne({
            where: { username }
        });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with username '${username}' not found`);
        }
        return passenger;
    }
    async removeByUsername(username) {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        const passenger = await this.passengerRepository.findOne({
            where: { username }
        });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with username '${username}' not found`);
        }
        await this.passengerRepository.remove(passenger);
        return { message: `Passenger with username '${username}' has been deleted` };
    }
    async findAll() {
        return await this.passengerRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findById(id) {
        const passenger = await this.passengerRepository.findOne({
            where: { id }
        });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found`);
        }
        return passenger;
    }
    async update(id, updatePassengerDto) {
        const passenger = await this.findById(id);
        if (updatePassengerDto.username && updatePassengerDto.username !== passenger.username) {
            const existingUser = await this.passengerRepository.findOne({
                where: { username: updatePassengerDto.username }
            });
            if (existingUser) {
                throw new common_1.ConflictException(`Username '${updatePassengerDto.username}' already exists`);
            }
        }
        Object.assign(passenger, updatePassengerDto);
        return await this.passengerRepository.save(passenger);
    }
    async updatePhotoPath(id, filename) {
        const passenger = await this.findById(id);
        passenger.photoPath = filename;
        return await this.passengerRepository.save(passenger);
    }
    getPassenger() {
        return 'Hello Nest Js';
    }
    getPassengerName(name) {
        return `Hello Passenger ${name} !`;
    }
};
exports.PassengerService = PassengerService;
exports.PassengerService = PassengerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(passenger_entities_1.Passenger)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PassengerService);
//# sourceMappingURL=passenger.service.js.map