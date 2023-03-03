import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PathEntity } from './entity/path.entity';
import { PathsByAuthsEntity } from './entity/pathsByAuths.entity';
import { AccessToken } from '../auth/model/accessToken.model';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(PathEntity)
    private pathEntityRepository: Repository<PathEntity>,
    @InjectRepository(PathsByAuthsEntity)
    private pathsByAuthsEntityRepository: Repository<PathsByAuthsEntity>,
  ) {}

  async getPathList({ user }: { user: AccessToken }) {
    const pathEntityList = await this.pathEntityRepository.find({
      relations: {
        pathsByAuthsList: true,
      },
      where: {
        pathsByAuthsList: {
          authId: user.authId,
        },
      },
    });
    console.log(pathEntityList);
    return pathEntityList.map((o) => o.toPath());
  }
}
