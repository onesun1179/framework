import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IconService {
  private readonly logger = new Logger(IconService.name);

  constructor() {}
}
