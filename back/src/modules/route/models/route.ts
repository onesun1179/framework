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
import { Role } from '@modules/role/model/role';
import { RouteRouteMap } from '@modules/route/models/route-route-map';
import { RoleRouteMap } from '@modules/role/model/role-route-map';

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

  @OneToMany(() => RouteRouteMap, (o) => o.childRoute, {
    nullable: true,
  })
  childRouteRouteMaps: RouteRouteMap[];

  children: Route[];

  @OneToMany(() => RouteRouteMap, (o) => o.parentRoute, {
    nullable: true,
  })
  parentRouteRouteMaps: RouteRouteMap[];

  parents: Route[];

  @OneToMany(() => RoleRouteMap, (o) => o.route)
  roleRouteMaps: RoleRouteMap[];

  roles: Role[];
}
