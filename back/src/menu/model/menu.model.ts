import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MenuEntity } from '../entity/menu.entity';

@ObjectType()
export class Menu implements Pick<MenuEntity, 'name' | 'id'> {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Menu])
  children: Menu[] = [];
}
