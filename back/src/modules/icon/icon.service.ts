import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IconService {
  constructor() {}
  private readonly logger = new Logger(IconService.name);
}
