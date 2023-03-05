import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './model/Route';
import { RoutesAuths } from './model/RoutesAuths';
import { AccessToken } from '../auth/model/AccessToken';
import { WhenDbInit } from '../common/types/WhenDbInit';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class RouteService implements WhenDbInit {
  constructor(
    @InjectRepository(Route)
    private pathEntityRepository: Repository<Route>,
    @InjectRepository(RoutesAuths)
    private pathsByAuthsEntityRepository: Repository<RoutesAuths>,

    private appConfigService: AppConfigService,
  ) {}
  private readonly logger = new Logger(RouteService.name);

  async whenDbInit() {}

  async getPathList({ user }: { user?: AccessToken }) {
    return await this.pathEntityRepository.find({
      relations: {
        routesAuthsList: true,
      },
      where: {
        routesAuthsList: {
          authId: user?.authId,
        },
      },
    });
  }
}
