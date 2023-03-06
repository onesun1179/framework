import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './model/Route';
import { FullRoutesAuths } from './model/FullRoutesAuths';
import { WhenDbInit } from '../common/types/WhenDbInit';
import { FullRoute } from './model/FullRoute';

@Injectable()
export class RouteService implements WhenDbInit {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(FullRoute)
    private fullRouteRepository: Repository<FullRoute>,
    @InjectRepository(FullRoutesAuths)
    private fullRoutesAuthsRepository: Repository<FullRoutesAuths>,
  ) {}
  private readonly logger = new Logger(RouteService.name);

  async whenDbInit() {}

  async getAllRouteList() {
    return await this.routeRepository.find();
  }

  async getRouteById(id: Route['id']) {
    return await this.routeRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getChildrenByParent(parent: Route) {
    return await this.routeRepository.find({
      relations: {
        parent: true,
      },
      where: {
        parent: {
          id: parent.id,
        },
      },
    });
  }
}
