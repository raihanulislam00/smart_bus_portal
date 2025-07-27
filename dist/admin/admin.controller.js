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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const admin_service_1 = require("./admin.service");
const createAdmin_dto_1 = require("./dto/createAdmin.dto");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
const admin_exist_pipe_1 = require("./pipes/admin-exist.pipe");
let AdminController = class AdminController {
    adminservice;
    constructor(adminservice) {
        this.adminservice = adminservice;
    }
    getAdminname(name) {
        return this.adminservice.getAdminName(name);
    }
    getAdminWithQuery(name) {
        return this.adminservice.getAdminName(name || 'world');
    }
    findAll(search) {
        const extractAllPost = this.adminservice.findAll();
        if (search) {
            return extractAllPost.filter(singlePost => singlePost.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractAllPost;
    }
    findOne(id) {
        return this.adminservice.findOne(id);
    }
    create(createAdminData) {
        const dataToCreate = {
            ...createAdminData,
        };
        return this.adminservice.create(dataToCreate);
    }
    update(id, updateAdminData) {
        const dataToUpdate = {
            ...updateAdminData,
        };
        return this.adminservice.update(id, dataToUpdate);
    }
    remove(id) {
        this.adminservice.remove(id);
    }
    uploadPhoto(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('Photo file is required and must be an image (jpg, jpeg, png, webp)');
        }
        return this.adminservice.updatePhotoPath(id, file.filename);
    }
    getPhoto(filename, res) {
        res.sendFile(filename, { root: './uploads/photos' });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('user/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AdminController.prototype, "getAdminname", null);
__decorate([
    (0, common_1.Get)('query'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AdminController.prototype, "getAdminWithQuery", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, admin_exist_pipe_1.AdminExistPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAdmin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, admin_exist_pipe_1.AdminExistPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAdmin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, admin_exist_pipe_1.AdminExistPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            }
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/photos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('photo/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPhoto", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map