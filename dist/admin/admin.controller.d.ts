import { AdminService } from './admin.service';
import { Post as PostInterface } from './interfaces/post.interface';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
export declare class AdminController {
    private readonly adminservice;
    constructor(adminservice: AdminService);
    getAdminname(name: string): string;
    getAdminWithQuery(name: string): string;
    findAll(search?: string): PostInterface[];
    findOne(id: number): PostInterface;
    create(createAdminData: CreateAdminDto): PostInterface;
    update(id: number, updateAdminData: UpdateAdminDto): PostInterface;
    remove(id: number): void;
    uploadPhoto(id: number, file: Express.Multer.File): PostInterface;
    getPhoto(filename: string, res: any): void;
}
