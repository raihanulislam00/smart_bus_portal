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
exports.CreateDriverDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateDriverDto {
    id;
    fullName;
    age;
    name;
    email;
    nid;
    nidImage;
}
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Age must be an integer number' }),
    (0, class_validator_1.Min)(0, { message: 'Age must not be less than 0' }),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.Matches)(/^[A-Za-z\s]+$/, {
        message: 'Name must contain only alphabets',
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.Matches)(/^[^@]+@[^@]+\.xyz$/, {
        message: 'Email must be a valid .xyz domain',
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'NID is required' }),
    (0, class_validator_1.Matches)(/^\d{10,13}$/, {
        message: 'NID must be between 10 to 13 digits , and nid must have number ,',
    }),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "nid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "nidImage", void 0);
//# sourceMappingURL=create-driver.dto.js.map