import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CodeEntity } from '../entity/code.entity';

@ObjectType()
export class Code implements Pick<CodeEntity, 'id' | 'name'> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Code])
  children: Code[] = [];
}
