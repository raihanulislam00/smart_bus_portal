export interface PassengerInterface {
    id: number;
    name: string;
    mail: string;
    phone: string;
    address?: string;
    createdAt: Date;
    updatedAt?: Date;
    gender: string;
    password: string;
    photoPath?: string;
}
