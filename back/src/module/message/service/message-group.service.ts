import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MessageGroupService {
  private readonly logger = new Logger(MessageGroupService.name);

  constructor(private dataSource: DataSource) {}
}
