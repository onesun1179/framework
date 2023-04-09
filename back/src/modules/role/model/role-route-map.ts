import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Route } from '@modules/route/models/route';
import { Role } from '@modules/role/model/role';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRoleRouteMap')
export class RoleRouteMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo: number;

  @PrimaryColumn()
  @Field(() => Int)
  routeSeqNo: number;

  @ManyToOne(() => Role, (o) => o.roleRouteMaps)
  @Field(() => Role)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;

  @ManyToOne(() => Route, (o) => o.roleRouteMaps)
  @Field(() => Route)
  @JoinColumn({
    name: 'route_seq_no',
  })
  route: Route;
}
