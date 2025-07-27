import { Post } from './interfaces/post.interface';
export declare class AdminService {
    getAdmin(): string;
    getAdminName(name: string): string;
    private admin;
    findAll(): Post[];
    findOne(id: number): Post;
    create(createAdminData: Omit<Post, 'id' | 'createdAt'>): Post;
    update(id: number, updateAdminData: Partial<Omit<Post, 'id' | 'createdAt'>>): Post;
    remove(id: number): {
        message: string;
    };
    private getNextId;
    updatePhotoPath(id: number, filename: string): Post;
}
