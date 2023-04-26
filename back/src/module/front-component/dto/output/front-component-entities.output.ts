import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';

@ObjectType()
export class FrontComponentEntitiesOutput extends PagingOutput(
  FrontComponentEntity,
) {}
