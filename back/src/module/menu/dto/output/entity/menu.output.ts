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
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@Entity('menu')
@InputType({
  isAbstract: true,
})
@ObjectType(`MenuOutput`)
export class MenuOutput extends CommonEntity {
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

  @OneToMany(() => MenuRoleMapOutput, (o) => o.menu, {
    nullable: true,
  })
  @Type(() => MenuRoleMapOutput)
  menuRoleMaps?: Array<MenuRoleMapOutput>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  routeSeqNo?: Nullable<number>;

  @ManyToOne(() => RouteOutput, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  @Type(() => RouteOutput)
  route?: Nullable<RouteOutput>;
}
