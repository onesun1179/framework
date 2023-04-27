import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@Entity('role_route_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleRouteMapOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  routeSeqNo!: number;

  @ManyToOne(() => RoleOutput, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role!: RoleOutput;

  @ManyToOne(() => RouteOutput, (o) => o.roleRouteMaps)
  @JoinColumn({
    name: 'route_seq_no',
  })
  route!: RouteOutput;
}
