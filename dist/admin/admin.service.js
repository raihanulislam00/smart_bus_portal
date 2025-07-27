"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    getAdmin() {
        return 'Hello This is Admin Dashboard';
    }
    getAdminName(name) {
        return `Hello Admin ${name} !`;
    }
    admin = [
        {
            id: 1,
            name: 'Shahriar Reza',
            mail: 'shahriarreza18@gmail.com',
            address: 'Dhaka, Bangladesh',
            content: 'This is Admin One Dashboard',
            createdAt: new Date(),
            password: '',
            birthDate: new Date(),
            socialMediaLink: ''
        },
        {
            id: 2,
            name: 'Shihab Reza',
            mail: 'shahriarreza@gmail.com',
            address: 'Ghatail, Tangail',
            content: 'This is Admin Two Dashboard',
            createdAt: new Date(),
            password: '',
            birthDate: new Date(),
            socialMediaLink: ''
        },
    ];
    findAll() {
        return this.admin;
    }
    findOne(id) {
        const singlePost = this.admin.find(post => post.id === id);
        if (!singlePost) {
            throw new common_1.NotFoundException(`Admin with ID ${id} is not Found`);
        }
        return singlePost;
    }
    create(createAdminData) {
        const newPost = {
            id: this.getNextId(),
            ...createAdminData,
            createdAt: new Date(),
        };
        this.admin.push(newPost);
        return newPost;
    }
    update(id, updateAdminData) {
        const currentIndexToEdit = this.admin.findIndex((post) => post.id === id);
        if (currentIndexToEdit === -1) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found !`);
        }
        this.admin[currentIndexToEdit] = {
            ...this.admin[currentIndexToEdit],
            ...updateAdminData,
            updatedAt: new Date(),
        };
        return this.admin[currentIndexToEdit];
    }
    remove(id) {
        const currentIndexToDelete = this.admin.findIndex((post) => post.id === id);
        if (currentIndexToDelete === -1) {
            throw new common_1.NotFoundException(`Admin with ID ${id} is not found`);
        }
        this.admin.splice(currentIndexToDelete, 1);
        return { message: `Admin with ID ${id} has been deleted...` };
    }
    getNextId() {
        return this.admin.length > 0
            ? Math.max(...this.admin.map(post => post.id)) + 1 : 1;
    }
    updatePhotoPath(id, filename) {
        const index = this.admin.findIndex(post => post.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        this.admin[index].photoPath = filename;
        return this.admin[index];
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map