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
exports.DriverController = void 0;
const common_1 = require("@nestjs/common");
const create_driver_dto_1 = require("./create-driver.dto");
const driver_service_1 = require("./driver.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const multer_2 = require("multer");
let DriverController = class DriverController {
    driverService;
    constructor(driverService) {
        this.driverService = driverService;
    }
    create(driverDto, nidImage) {
        if (!nidImage) {
            throw new common_1.BadRequestException('NID image is required and must be under 2MB');
        }
        driverDto.id = Number(driverDto.id);
        return this.driverService.createDriver({
            ...driverDto,
            nidImage: nidImage.filename,
        });
    }
    getDriverById(id) {
        return this.driverService.findById(id);
    }
    getAllDrivers() {
        return this.driverService.findAll();
    }
    getNidImage(name, res) {
        return res.sendFile(name, { root: './uploads/nid' });
    }
};
exports.DriverController = DriverController;
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('nidImage', {
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|png)$/)) {
                return cb(new multer_2.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/nid',
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_driver_dto_1.CreateDriverDto, Object]),
    __metadata("design:returntype", void 0)
], DriverController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DriverController.prototype, "getDriverById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DriverController.prototype, "getAllDrivers", null);
__decorate([
    (0, common_1.Get)('nid/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DriverController.prototype, "getNidImage", null);
exports.DriverController = DriverController = __decorate([
    (0, common_1.Controller)('driver'),
    __metadata("design:paramtypes", [driver_service_1.DriverService])
], DriverController);
//# sourceMappingURL=driver.controller.js.map