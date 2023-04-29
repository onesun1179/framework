import { PagingOutput } from '@common/dto/output/paging.output';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CodesOutput extends PagingOutput(CodeOutput) {}
