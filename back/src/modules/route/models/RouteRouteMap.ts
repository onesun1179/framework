import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { Route } from '@modules/route/models/Route';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('route', 's', 'by', 'route', 's'),
})
@ObjectType({
  description: UtilField.getFieldComment('route', 's', 'by', 'route', 's'),
})
export class RouteRouteMap extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('child', 'route', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('child', 'route', 'seqNo'),
  })
  childSeqNo: number;

  @PrimaryColumn({
    comment: UtilField.getFieldComment('parent', 'route', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('parent', 'route', 'seqNo'),
  })
  parentSeqNo: number;

  @ManyToOne(() => Route, (o) => o.children)
  @Field(() => Route, {
    description: UtilField.getFieldComment('child', 'route'),
  })
  @JoinColumn({
    name: 'child_seq_no',
  })
  childRoute: Route;

  @ManyToOne(() => Route, (o) => o.parents)
  @Field(() => Route, {
    description: UtilField.getFieldComment('parent', 'route'),
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parentRoute: Route;
}
