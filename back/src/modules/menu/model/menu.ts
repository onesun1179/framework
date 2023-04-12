import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { MenuRoleMap } from './menu-role-map';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Icon } from '@modules/icon/model/icon';
import { Route } from '@modules/route/dto/route';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlMenu')
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  iconSeqNo?: Nullable<number>;

  @ManyToOne(() => Icon, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  icon?: Nullable<Icon>;

  @OneToMany(() => MenuRoleMap, (o) => o.menu)
  menuRoleMaps!: Array<MenuRoleMap>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  routeSeqNo?: Nullable<number>;

  @ManyToOne(() => Route, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  route?: Nullable<Route>;
}
