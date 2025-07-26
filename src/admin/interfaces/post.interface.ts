export interface Post{
    id: number;
    name: string;
    mail: string;
    phone: string;
    address?: string;
    content: string;
    createdAt:Date;
    updatedAt?:Date;
}