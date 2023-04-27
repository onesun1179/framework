import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';

@Entity('route')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RouteOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  path!: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: Nullable<string>;

  @ManyToOne(() => FrontComponentOutput, (o) => o.routes, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: Nullable<FrontComponentOutput>;

  @OneToMany(() => RouteOutput, (o) => o.parent, {
    nullable: true,
  })
  children?: Nullable<RouteOutput[]>;

  @ManyToOne(() => RouteOutput, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Nullable<RouteOutput>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @OneToMany(() => RoleRouteMapOutput, (o) => o.route, {
    nullable: true,
  })
  roleRouteMaps?: Nullable<RoleRouteMapOutput[]>;

  @OneToMany(() => MenuOutput, (o) => o.route, {
    nullable: true,
  })
  menus?: Nullable<Array<MenuOutput>>;
}
