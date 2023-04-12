import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Route } from '@modules/route/dto/route';
import { Role } from '@modules/role/entities/role.entity';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRoleRouteMap')
export class RoleRouteMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  routeSeqNo!: number;

  @ManyToOne(() => Role, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role!: Role;

  @ManyToOne(() => Route, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'route_seq_no',
  })
  route!: Route;
}
