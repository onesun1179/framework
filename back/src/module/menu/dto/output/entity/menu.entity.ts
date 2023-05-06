import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@Entity('menu')
@InputType({
  isAbstract: true,
})
@ObjectType('MenuOutput')
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

  @ManyToOne(() => IconOutput, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  @Type(() => IconOutput)
  icon?: Nullable<IconOutput>;

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

  @OneToOne(() => RouteOutput, (o) => o.menu, {
    nullable: true,
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  @Type(() => RouteOutput)
  route?: Nullable<RouteOutput>;
}
