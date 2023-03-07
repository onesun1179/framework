import { Injectable, Logger } from '@nestjs/common';
import { Route } from './models/Route';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}
  private readonly logger = new Logger(RouteService.name);

  getRouteRepository() {
    return this.routeRepository;
  }
}
