import { ArgumentMetadata, Injectable, PipeTransform, NotFoundException } from "@nestjs/common";
import { AdminService } from "../admin.service";

@Injectable()
export class AdminExistPipe implements PipeTransform {
  constructor(private readonly adminService: AdminService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const admin = await this.adminService.findOne(value);

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${value} does not exist.`);
    }

    return value;
  }
}
