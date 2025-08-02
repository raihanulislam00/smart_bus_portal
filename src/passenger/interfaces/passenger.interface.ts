export interface PassengerInterface{
    id: number;
    username: string;
    fullName: string;
    isActive: boolean;
    mail?: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt?: Date;
    gender?: string;
    password?: string;
    photoPath?: string;
}