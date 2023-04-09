import { BaseEntity, Repository } from 'typeorm';

export class EntityRepository<
  Entity extends BaseEntity,
> extends Repository<Entity> {}
