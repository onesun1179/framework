import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { UtilField } from '@util/Util.field';
import { Route } from '@modules/route/models/route';
import { Role } from '@modules/role/model/role';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('role', 'route', 'map'),
})
@ObjectType({
  description: UtilField.getFieldComment('role', 'route', 'map'),
})
export class RoleRouteMap extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('role', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'seqNo'),
  })
  roleSeqNo: number;

  @PrimaryColumn({
    comment: UtilField.getFieldComment('route', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('route', 'seqNo'),
  })
  routeSeqNo: number;

  @ManyToOne(() => Role, (o) => o.roleRouteMaps)
  @Field(() => Role, {
    description: UtilField.getFieldComment('role'),
  })
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;

  @ManyToOne(() => Route, (o) => o.roleRouteMaps)
  @Field(() => Route, {
    description: UtilField.getFieldComment('route'),
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  route: Route;
}
