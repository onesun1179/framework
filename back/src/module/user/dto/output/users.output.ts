import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';

@ObjectType()
export class UsersOutput extends PagingOutput(UserOutput) {}
