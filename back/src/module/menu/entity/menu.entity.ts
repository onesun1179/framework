import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';

@Entity('menu')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MenuEntity extends CommonEntity {
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

  @ManyToOne(() => IconEntity, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  @Type(() => IconEntity)
  icon?: Nullable<IconEntity>;

  @OneToMany(() => MenuRoleMapEntity, (o) => o.menu, {
    nullable: true,
  })
  @Type(() => MenuRoleMapEntity)
  menuRoleMaps?: Array<MenuRoleMapEntity>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  routeSeqNo?: Nullable<number>;

  @ManyToOne(() => RouteEntity, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  @Type(() => RouteEntity)
  route?: Nullable<RouteEntity>;
}
