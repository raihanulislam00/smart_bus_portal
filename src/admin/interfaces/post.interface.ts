export interface Post {
  id: number;
  name: string;
  password: string;
  mail: string;
  socialMediaLink: string;
  photoPath?: string;
  uniqueId: string;
  joiningDate: Date;
  country: string;
}