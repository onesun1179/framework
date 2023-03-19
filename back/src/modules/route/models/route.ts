import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleRouteMap } from '@modules/role/model/role-route-map';
import { Menu } from '@modules/menu/model/menu';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class Route extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  path: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: string;

  @ManyToOne(() => FrontComponent, (o) => o.routes, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => Route, (o) => o.parent, {
    nullable: true,
  })
  children: Route[];

  @ManyToOne(() => Route, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Route;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo: number;

  @OneToMany(() => RoleRouteMap, (o) => o.route)
  roleRouteMaps: RoleRouteMap[];

  @OneToMany(() => Menu, (o) => o.route)
  menus: Array<Menu>;
}
