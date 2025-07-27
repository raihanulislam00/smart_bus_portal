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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateAdminDto {
    name;
    password;
    birthDate;
    socialMediaLink;
    content;
    mail;
    phone;
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Name must not exceed 50 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s]*$/, {
        message: 'Name must contain only letters and spaces'
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/.*[@#$&].*/, {
        message: 'Password must contain at least one of these special characters: @, #, $, or &'
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateAdminDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "socialMediaLink", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Content is required' }),
    (0, class_validator_1.IsString)({ message: 'Content must be a string' }),
    (0, class_validator_1.MinLength)(10, { message: 'Content must be at least 10 characters long' }),
    (0, class_validator_1.MaxLength)(150, { message: 'Content must not exceed 150 characters' }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mail is required' }),
    (0, class_validator_1.IsString)({ message: 'Mail must be a string' }),
    (0, class_validator_1.MinLength)(7, { message: 'Mail must be at least 7 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mail must not exceed 50 characters' }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone is required' }),
    (0, class_validator_1.IsString)({ message: 'Phone must be a string' }),
    (0, class_validator_1.MinLength)(11, { message: 'Phone must be at least 11 digits long' }),
    (0, class_validator_1.MaxLength)(11, { message: 'Phone must not exceed 11 digits' }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "phone", void 0);
//# sourceMappingURL=updateAdmin.dto.js.map