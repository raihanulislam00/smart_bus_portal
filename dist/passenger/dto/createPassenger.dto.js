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
exports.CreatePassengerDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePassengerDto {
    username;
    fullName;
    isActive;
    mail;
    password;
    gender;
    phone;
    address;
}
exports.CreatePassengerDto = CreatePassengerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required' }),
    (0, class_validator_1.IsString)({ message: 'Username must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Username must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Username must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name is required' }),
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Full name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(150, { message: 'Full name must not exceed 150 characters' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'isActive must be a boolean' }),
    __metadata("design:type", Boolean)
], CreatePassengerDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mail must be a string' }),
    (0, class_validator_1.MinLength)(7, { message: 'Mail must be at least 7 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mail must not exceed 50 characters' }),
    (0, class_validator_1.Matches)(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, { message: 'Email must be a valid email address' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase letter' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Gender must be a string' }),
    (0, class_validator_1.IsIn)(['male', 'female'], { message: 'Gender must be either male or female' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Enter Your Phone Number ' }),
    (0, class_validator_1.MinLength)(11, { message: 'Invalid phone' }),
    (0, class_validator_1.MaxLength)(11, { message: 'Phone must not exceed 11 digits' }),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Address must not exceed 200 characters' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "address", void 0);
//# sourceMappingURL=createPassenger.dto.js.map