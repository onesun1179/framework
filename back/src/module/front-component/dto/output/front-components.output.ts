import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';

@ObjectType()
export class FrontComponentsOutput extends PagingOutput(FrontComponentOutput) {}
