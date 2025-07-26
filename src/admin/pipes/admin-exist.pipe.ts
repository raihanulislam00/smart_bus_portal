import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { AdminService } from "../admin.service";


@Injectable()
export class AdminExistPipe implements PipeTransform{
    constructor(private readonly adminService: AdminService) {}
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            this.adminService.findOne(value);

        }
        catch (error) {
            throw new Error(`Admin with ID ${value} does not exist.`);
        }
        return value;
        
    }
}