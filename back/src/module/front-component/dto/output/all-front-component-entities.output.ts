import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';

@ObjectType()
export class AllFrontComponentEntitiesOutput extends PagingOutput(
  AllFrontComponentEntity,
) {}
