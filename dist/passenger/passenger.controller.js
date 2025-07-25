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
const passenger_dto_1 = require("./passenger.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let PassengerController = class PassengerController {
    passengerService;
    constructor(passengerService) {
        this.passengerService = passengerService;
    }
    addPassenger(passengerDto) {
        console.log('Adding passenger:', passengerDto);
        return this.passengerService.addPassenger(passengerDto);
    }
    getPassengers() {
        return this.passengerService.getPassengers();
    }
    getPassengerById(id) {
        return this.passengerService.getPassengerById(id);
    }
    uploadFile(file) {
        console.log('Uploaded file:', file);
        return { filename: file.filename };
    }
};
exports.PassengerController = PassengerController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [passenger_dto_1.PassengerDTO]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "addPassenger", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "getPassengers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "getPassengerById", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            }
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
            }
        },
        limits: { fileSize: 30_000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PassengerController.prototype, "uploadFile", null);
exports.PassengerController = PassengerController = __decorate([
    (0, common_1.Controller)('passenger'),
    __metadata("design:paramtypes", [passenger_service_1.PassengerService])
], PassengerController);
//# sourceMappingURL=passenger.controller.js.map