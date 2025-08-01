import { UserDto } from '@/user/dto/user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<UserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    email: string;
    password: string;
    foto: string;
}
export {};
