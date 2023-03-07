import { Injectable, Logger } from '@nestjs/common';
import { Route } from './model/Route';
import { WhenDbInit } from '../common/types/WhenDbInit';
import { FullRoute } from './model/FullRoute';
import { Builder } from 'builder-pattern';
import { FrontComponent } from '../front-component/model/FrontComponent';
import { FRONT_COMPONENT_MAP } from '../front-component/front-component.constant';

@Injectable()
export class RouteService implements WhenDbInit {
  private readonly logger = new Logger(RouteService.name);

  async whenDbInit() {
    const homeComponent = await FrontComponent.findOne({
      where: {
        id: FRONT_COMPONENT_MAP.home,
      },
    });
    const loginComponent = await FrontComponent.findOne({
      where: {
        id: FRONT_COMPONENT_MAP.login,
      },
    });
    const home = await Builder(Route, {
      path: '/',
      frontComponent: homeComponent,
    })
      .build()
      .save();

    const login = await Builder(Route, {
      path: '/login',
      frontComponent: loginComponent,
    })
      .build()
      .save();
    await Builder(FullRoute, {
      route: home,
    })
      .build()
      .save();
    await Builder(FullRoute, {
      route: login,
    })
      .build()
      .save();
  }

  async getAllRouteList() {
    return await Route.find();
  }

  async getRouteById(id: Route['id']) {
    return await Route.findOne({
      where: {
        id,
      },
    });
  }

  async getChildrenByParent(parent: Route) {
    return await Route.find({
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
