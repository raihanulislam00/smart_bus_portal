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
    name;
    mail;
    password;
    gender;
    phone;
}
exports.CreatePassengerDto = CreatePassengerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Name must not exceed 50 characters' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'mail is required' }),
    (0, class_validator_1.IsString)({ message: 'mail must be a string' }),
    (0, class_validator_1.MinLength)(7, { message: 'mail must be at least 7 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'mail must not exceed 50 characters' }),
    (0, class_validator_1.Matches)(/^[\w.-]+@aiub\.edu$/, { message: 'Email must be a valid aiub.edu address' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase letter' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Gender is required' }),
    (0, class_validator_1.IsString)({ message: 'Gender must be a string' }),
    (0, class_validator_1.IsIn)(['male', 'female'], { message: 'Gender must be either male or female' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'phone is required' }),
    (0, class_validator_1.IsString)({ message: 'Enter Your Phone Number ' }),
    (0, class_validator_1.MinLength)(11, { message: 'phone must be at least 11 digits long' }),
    (0, class_validator_1.MaxLength)(11, { message: 'phone must not exceed 11 digits' }),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], CreatePassengerDto.prototype, "phone", void 0);
//# sourceMappingURL=createPassenger.dto.js.map