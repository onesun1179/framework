import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Route } from '@modules/route/models/route';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RouteRouteMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo: number;

  @ManyToOne(() => Route, (o) => o.children)
  @Field(() => Route)
  @JoinColumn({
    name: 'child_seq_no',
  })
  childRoute: Route;

  @ManyToOne(() => Route, (o) => o.parents)
  @Field(() => Route)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parentRoute: Route;
}
