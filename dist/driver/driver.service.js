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
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const driver_1 = require("./entities/driver");
let DriverService = class DriverService {
    driverRepo;
    drivers = [];
    constructor(driverRepo) {
        this.driverRepo = driverRepo;
    }
    async createDriver(driverDto) {
        await this.driverRepo.save(driverDto);
        return {
            message: 'Driver created successfully',
            data: driverDto,
        };
    }
    findAllDrivers() {
        return this.driverRepo.find({ where: { status: 'inactive' } });
    }
    findDriverById(id) {
        const driver = this.drivers.find((d) => d.id === id);
        if (!driver) {
            return { message: 'Driver not found' };
        }
        return driver;
    }
    createDriverInDB(createDriverDto) {
        const driver = this.driverRepo.create(createDriverDto);
        return this.driverRepo.save(driver);
    }
    async updateDriverStatus(id, dto) {
        const result = await this.driverRepo.update(id, { status: dto.status });
        return result.affected
            ? { message: 'Status updated' }
            : { message: 'Driver not found' };
    }
    getInactiveDrivers() {
        return this.driverRepo.find({ where: { status: 'inactive' } });
    }
    getDriversOlderThan(age) {
        return this.driverRepo
            .createQueryBuilder('driver')
            .where('driver.age > :age', { age })
            .getMany();
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(driver_1.Driver)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DriverService);
//# sourceMappingURL=driver.service.js.map