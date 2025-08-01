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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_entity_1 = require("./entities/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
let UserService = UserService_1 = class UserService {
    userRepository;
    logger = new common_1.Logger(UserService_1.name);
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userDto, foto) {
        const user = new user_entity_1.User();
        user.name = userDto.name;
        user.email = userDto.email;
        user.password = await bcrypt.hash(userDto.password, 20);
        user.foto = foto?.filename;
        return this.userRepository.save(user);
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findByEmail(email) {
        const user = this.userRepository.findOneBy({ email });
        return user ?? null;
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async updateUser(id, updateUserDto, foto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} nout found`);
        }
        if (updateUserDto.password) {
            user.password = await bcrypt.hash(updateUserDto.password, 20);
        }
        if (foto) {
            if (user.foto) {
                const filePath = path.join(__dirname, '..', '..', 'uploads', user.foto);
                try {
                    fs.unlinkSync(filePath);
                }
                catch (error) {
                    throw new Error(error);
                }
            }
            user.foto = foto?.filename;
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} nout found`);
        }
        if (user.foto) {
            const filePath = path.join(__dirname, '..', '..', 'uploads', user.foto);
            try {
                fs.unlinkSync(filePath);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        await this.userRepository.delete({ id });
        return { message: 'Delete user successfully' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map