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
var BlogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const slugify_1 = require("slugify");
let BlogService = BlogService_1 = class BlogService {
    blogRepository;
    logger = new common_1.Logger(BlogService_1.name);
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async create(createBlogDto) {
        try {
            const slug = (0, slugify_1.default)(createBlogDto.title, { lower: true });
            const exitingSlug = await this.blogRepository.findOne({
                where: { slug },
            });
            if (exitingSlug) {
                throw new common_1.ConflictException(`Title with ${createBlogDto.title} alredy exit`);
            }
            const blog = new blog_entity_1.Blog();
            blog.title = createBlogDto.title;
            blog.slug = slug;
            blog.description = createBlogDto.description;
            blog.category = { id: createBlogDto.categoryId };
            blog.author = { id: createBlogDto.authorId };
            const blogSave = await this.blogRepository.save(blog);
            if (!blogSave) {
                throw new common_1.BadRequestException('Something bad happened', {
                    cause: new Error(),
                    description: 'Some error description',
                });
            }
            return blogSave;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Internal server error', {
                cause: new Error(),
                description: `Internal server error ${error}`,
            });
        }
    }
    async findAll() {
        return await this.blogRepository.find({
            relations: ['category', 'author'],
        });
    }
    async findOne(id) {
        const blog = await this.blogRepository.findOne({
            where: { id },
            relations: ['category', 'author'],
        });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with id ${id} not found`);
        }
        return blog;
    }
    async findByCategory(categorySlug) {
        return this.blogRepository
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.category', 'category')
            .leftJoinAndSelect('blog.author', 'author')
            .where('category.slug = :categorySlug', { categorySlug })
            .getMany();
    }
    async update(id, updateBlogDto) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with id ${id} not found`);
        }
        if (updateBlogDto.title) {
            const slug = (0, slugify_1.default)(updateBlogDto.title, { lower: true });
            if (slug !== blog.slug) {
                const exitingSlug = await this.blogRepository.findOne({
                    where: { slug },
                });
                if (exitingSlug) {
                    throw new common_1.ConflictException(`Title with ${updateBlogDto.title} alredy exit`);
                }
                blog.slug = slug;
                blog.title = updateBlogDto.title;
            }
        }
        Object.assign(blog, updateBlogDto);
        return this.blogRepository.save(blog);
    }
    async remove(id) {
        await this.blogRepository.delete({ id });
        return { message: 'Delete blog successfully' };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = BlogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map