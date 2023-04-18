import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@Entity('role_route_map')
@InputType({
  isAbstract: true,
})
@ObjectType(`RoleRouteMapEntityOutput`)
export class RoleRouteMapEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  routeSeqNo!: number;

  @ManyToOne(() => RoleEntity, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role!: RoleEntity;

  @ManyToOne(() => RouteEntity, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'route_seq_no',
  })
  route!: RouteEntity;
}
