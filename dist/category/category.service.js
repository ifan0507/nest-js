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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const slugify_1 = require("slugify");
let CategoryService = class CategoryService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const slug = (0, slugify_1.default)(createCategoryDto.name, { lower: true });
        const exitingSlug = await this.categoryRepository.findOne({
            where: { slug },
        });
        if (exitingSlug) {
            throw new common_1.ConflictException(`Category ${createCategoryDto.name} already exit `);
        }
        const category = new category_entity_1.Category();
        category.name = createCategoryDto.name;
        category.slug = slug;
        return this.categoryRepository.save(category);
    }
    async findAll() {
        return this.categoryRepository.find();
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        }
        if (updateCategoryDto.name) {
            const slug = (0, slugify_1.default)(updateCategoryDto.name, { lower: true });
            if (slug !== category.slug) {
                const exitingSlug = await this.categoryRepository.findOne({
                    where: { slug },
                });
                if (exitingSlug) {
                    throw new common_1.ConflictException(`Category ${updateCategoryDto.name} already exit `);
                }
                category.slug = slug;
            }
            category.name = updateCategoryDto.name;
        }
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        }
        return this.categoryRepository.delete({ id });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map