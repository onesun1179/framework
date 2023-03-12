import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Icon } from './model/Icon';

@Injectable()
export class IconService {
  constructor(
    @InjectRepository(Icon)
    private iconRepository: Repository<Icon>,
  ) {}
  private readonly logger = new Logger(IconService.name);

  getIconRepository() {
    return this.iconRepository;
  }
}
