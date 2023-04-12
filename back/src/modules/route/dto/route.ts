import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';
import { Menu } from '@modules/menu/model/menu';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType(`GqlRoute`)
export class Route extends CommonEntity {
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

  @ManyToOne(() => FrontComponent, (o) => o.routes, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: Nullable<FrontComponent>;

  @OneToMany(() => Route, (o) => o.parent, {
    nullable: true,
  })
  children?: Nullable<Route[]>;

  @ManyToOne(() => Route, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Nullable<Route>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @OneToMany(() => RoleRouteMap, (o) => o.route, {
    nullable: true,
  })
  roleRouteMaps?: Nullable<RoleRouteMap[]>;

  @OneToMany(() => Menu, (o) => o.route, {
    nullable: true,
  })
  menus?: Nullable<Array<Menu>>;
}
