import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { AdminService } from "../admin.service";
export declare class AdminExistPipe implements PipeTransform {
    private readonly adminService;
    constructor(adminService: AdminService);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
