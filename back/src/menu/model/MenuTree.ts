import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Menu } from './Menu';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class MenuTree extends CommonEntity {
  @PrimaryColumn()
  childId: number;

  @PrimaryColumn()
  parentId: number;

  @ManyToOne(() => Menu, (o) => o.childList)
  @Field(() => Menu)
  child: Menu;

  @ManyToOne(() => Menu, (o) => o.parentList)
  @Field(() => Menu)
  parent: Menu;
}
