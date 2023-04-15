import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor() {}
  private readonly logger = new Logger(RoleService.name);
}
