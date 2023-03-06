import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MenuTree } from './MenuTree';
import { MenusAuths } from './MenusAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => MenuTree, (o) => o.child)
  @Field(() => [MenuTree])
  childList: MenuTree[];

  @OneToMany(() => MenuTree, (o) => o.parent)
  @Field(() => [MenuTree])
  parentList: MenuTree[];

  @OneToMany(() => MenusAuths, (o) => o.menu)
  @Field(() => [MenusAuths])
  menusAuths: MenusAuths[];
}
