import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthEntity } from '../entity/auth.entity';

@ObjectType({
  description: '권한',
})
export class Auth implements Pick<AuthEntity, 'id' | 'name' | 'identifier'> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({
    nullable: true,
  })
  identifier?: string;

  @Field(() => [Auth])
  children: Auth[] = [];
}
