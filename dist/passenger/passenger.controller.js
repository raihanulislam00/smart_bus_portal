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
exports.PassengerController = void 0;
const common_1 = require("@nestjs/common");
const passenger_service_1 = require("./passenger.service");
const createPassenger_dto_1 = require("./dto/createPassenger.dto");
const updatePassenger_dto_1 = require("./dto/updatePassenger.dto");
const passenger_exist_pipe_1 = require("./pipes/passenger-exist.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const multer_2 = require("multer");
let PassengerController = class PassengerController {
    passengerservice;
    constructor(passengerservice) {
        this.passengerservice = passengerservice;
    }
    getPassengername(name) {
        return this.passengerservice.getPassengerName(name);
    }
    getPassengerWithQuery(name) {
        return this.passengerservice.getPassengerName(name || 'world');
    }
    findAll(search) {
        const extractAllPost = this.passengerservice.findAll();
        if (search) {
            return extractAllPost.filter(singlePost => singlePost.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractAllPost;
    }
    findOne(id) {
        return this.passengerservice.findOne(id);
    }
    create(createPassengerData) {
        const dataToCreate = {
            ...createPassengerData,
            phone: String(createPassengerData.phone)
        };
        return this.passengerservice.create(dataToCreate);
    }
    update(id, updatePassengerData) {
        const dataToUpdate = {
            ...updatePassengerData,
            phone: updatePassengerData.phone !== undefined ? String(updatePassengerData.phone) : undefined
        };
        return this.passengerservice.update(id, dataToUpdate);
    }
    remove(id) {
        this.passengerservice.remove(id);
    }
    uploadPhoto(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('Photo file is required and must be an image (jpg, jpeg, png, webp)');
        }
        return this.passengerservice.updatePhotoPath(id, file.filename);
    }
    getPhoto(filename, res) {
        res.sendFile(filename, { root: './uploads/photos' });
    }
};
exports.PassengerController = PassengerController;
__decorate([
    (0, common_1.Get)('user/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], PassengerController.prototype, "getPassengername", null);
__decorate([
    (0, common_1.Get)('query'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], PassengerController.prototype, "getPassengerWithQuery", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], PassengerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, passenger_exist_pipe_1.PassengerExistPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], PassengerController.prototype, "findOne", null);
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
    __metadata("design:paramtypes", [createPassenger_dto_1.CreatePassengerDto]),
    __metadata("design:returntype", Object)
], PassengerController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: false,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, passenger_exist_pipe_1.PassengerExistPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatePassenger_dto_1.UpdatePassengerDto]),
    __metadata("design:returntype", Object)
], PassengerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, passenger_exist_pipe_1.PassengerExistPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "remove", null);
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
        storage: (0, multer_2.diskStorage)({
            destination: './uploads/photos',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, passenger_exist_pipe_1.PassengerExistPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('photo/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "getPhoto", null);
exports.PassengerController = PassengerController = __decorate([
    (0, common_1.Controller)('passenger'),
    __metadata("design:paramtypes", [passenger_service_1.PassengerService])
], PassengerController);
//# sourceMappingURL=passenger.controller.js.map