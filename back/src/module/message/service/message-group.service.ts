import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MessageGroupService {
  constructor(private dataSource: DataSource) {}

  private readonly logger = new Logger(MessageGroupService.name);
}
