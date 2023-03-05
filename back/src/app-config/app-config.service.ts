import { CacheKey, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from './entity/AppConfig';
import { WhenDbInit } from '../common/types/WhenDbInit';

@Injectable()
export class AppConfigService implements WhenDbInit {
  constructor(
    @InjectRepository(AppConfig)
    private appConfigEntityRepository: Repository<AppConfig>,
  ) {}

  async whenDbInit() {}

  @CacheKey('app_config')
  async getValue(name: AppConfig['name']) {
    const appConfigEntity = await this.appConfigEntityRepository.findOne({
      where: {
        name,
      },
    });
    return appConfigEntity.value;
  }
}
