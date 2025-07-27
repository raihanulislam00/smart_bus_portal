export interface Post {
  id: number;
  name: string;
  password: string;
  mail: string;
  birthDate: Date;
  address?: string;
  content: string;
  socialMediaLink: string;
  photoPath?: string;
  createdAt: Date;
  updatedAt?: Date;
   
}