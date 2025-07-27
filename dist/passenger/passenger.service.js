"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerService = void 0;
const common_1 = require("@nestjs/common");
let PassengerService = class PassengerService {
    getPassenger() {
        return 'Hello Nest Js';
    }
    getPassengerName(name) {
        return `Hello Passenger ${name} !`;
    }
    passenger = [
        {
            id: 1,
            name: 'Raihanul Islam',
            mail: 'raihanulislam@gmail.com',
            phone: '1632641330',
            address: 'Dhaka, Bangladesh',
            createdAt: new Date(),
            gender: 'male',
            password: '123456',
        },
        {
            id: 2,
            name: 'Shihab',
            mail: 'shihab@gmail.com',
            phone: '1632641440',
            address: 'Ghatail, Tangail',
            createdAt: new Date(),
            gender: 'male',
            password: '123456',
        },
    ];
    findAll() {
        return this.passenger;
    }
    findOne(id) {
        const singlePost = this.passenger.find(post => post.id === id);
        if (!singlePost) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} is not Found`);
        }
        return singlePost;
    }
    create(createPassengerData) {
        const newPost = {
            id: this.getNextId(),
            ...createPassengerData,
            createdAt: new Date(),
        };
        this.passenger.push(newPost);
        return newPost;
    }
    update(id, updatePassengerData) {
        const currentIndexToEdit = this.passenger.findIndex((post) => post.id === id);
        if (currentIndexToEdit === -1) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found !`);
        }
        this.passenger[currentIndexToEdit] = {
            ...this.passenger[currentIndexToEdit],
            ...updatePassengerData,
            updatedAt: new Date(),
        };
        return this.passenger[currentIndexToEdit];
    }
    remove(id) {
        const currentIndexToDelete = this.passenger.findIndex((post) => post.id === id);
        if (currentIndexToDelete === -1) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} is not found`);
        }
        this.passenger.splice(currentIndexToDelete, 1);
        return { message: `Passenger with ID ${id} has been deleted...` };
    }
    getNextId() {
        return this.passenger.length > 0
            ? Math.max(...this.passenger.map(post => post.id)) + 1 : 1;
    }
    updatePhotoPath(id, filename) {
        const index = this.passenger.findIndex(post => post.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found`);
        }
        this.passenger[index].photoPath = filename;
        return this.passenger[index];
    }
};
exports.PassengerService = PassengerService;
exports.PassengerService = PassengerService = __decorate([
    (0, common_1.Injectable)()
], PassengerService);
//# sourceMappingURL=passenger.service.js.map