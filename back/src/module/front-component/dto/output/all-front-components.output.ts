import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';

@ObjectType()
export class AllFrontComponentsOutput extends PagingOutput(
  AllFrontComponentOutput,
) {}
