import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppMetadata } from './model/app-metadata';

@Injectable()
export class AppMetadataService {
  constructor(
    @InjectRepository(AppMetadata)
    private appMetadataRepository: Repository<AppMetadata>,
  ) {}

  async getAppMetaDataByName(name: AppMetadata['name']) {
    return await this.appMetadataRepository.findOneBy({
      name,
    });
  }
}
