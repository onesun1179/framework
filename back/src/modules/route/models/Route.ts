import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { FrontComponent } from '../../front-component/model/FrontComponent';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { Role } from '../../role/model/Role';
import { RouteRouteMap } from '@modules/route/models/RouteRouteMap';
import { RoleRouteMap } from '@modules/role/model/RoleRouteMap';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('route'),
})
@ObjectType({
  description: UtilField.getFieldComment('route'),
})
export class Route extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('route', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('route', 'seqNo'),
  })
  seqNo: number;

  @Column({
    comment: UtilField.getFieldComment('route', 'path'),
  })
  @Field({
    description: UtilField.getFieldComment('route', 'path'),
  })
  path: string;

  @Column({
    comment: UtilField.getFieldComment('front', 'component', 'seqNo'),
    nullable: true,
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('front', 'component', 'seqNo'),
    nullable: true,
  })
  frontComponentSeqNo?: number;

  @ManyToOne(() => FrontComponent, (o) => o.routes, {
    nullable: true,
  })
  @Field(() => FrontComponent, {
    nullable: true,
    description: UtilField.getFieldComment('front', 'component'),
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => RouteRouteMap, (o) => o.childRoute, {
    nullable: true,
  })
  childRouteRouteMap: RouteRouteMap[];

  children: Route[];

  @OneToMany(() => RouteRouteMap, (o) => o.parentRoute, {
    nullable: true,
  })
  parentRouteRouteMap: RouteRouteMap[];

  parents: Route[];

  @OneToMany(() => RoleRouteMap, (o) => o.route)
  roleRouteMaps: RoleRouteMap[];

  roles: Role[];
}
