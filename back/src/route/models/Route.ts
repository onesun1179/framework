import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponent } from '../../front-component/model/FrontComponent';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoutesAuths } from './RoutesAuths';

@Entity()
@ObjectType({
  description: '라우트',
})
export class Route extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '라우트 일련번호',
  })
  @Field(() => Int, {
    description: '라우트 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '라우트 경로',
  })
  @Field({
    description: '라우트 경로',
  })
  path: string;

  @Column({
    comment: '컴포넌트 일련번호',
    nullable: true,
  })
  @Field(() => Int, {
    description: '컴포넌트 일련번호',
    nullable: true,
  })
  frontComponentSeqNo?: FrontComponent['seqNo'];

  @ManyToOne(() => FrontComponent, (o) => o.routes, {
    nullable: true,
    lazy: true,
  })
  @Field(() => FrontComponent, {
    nullable: true,
    description: '컴포넌트',
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => Route, (o) => o.parents, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Route], {
    description: '자식들',
  })
  children: Route[];

  @ManyToOne(() => Route, (o) => o.children, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Route], {
    description: '부모들',
  })
  parents: Route[];

  @Field({
    description: '최종 여부',
  })
  leafYn: boolean;

  @OneToMany(() => RoutesAuths, (o) => o.route, {
    lazy: true,
  })
  routesAuths: RoutesAuths[];
}
