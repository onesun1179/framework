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

@Entity()
@ObjectType()
export class Route extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  path: string;

  @ManyToOne(() => FrontComponent, (o) => o.routeList, {
    nullable: true,
    lazy: true,
  })
  @Field(() => FrontComponent, {
    nullable: true,
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => Route, (o) => o.parent, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Route], {
    nullable: true,
    defaultValue: [],
  })
  children: Route[];

  @ManyToOne(() => Route, (o) => o.children, {
    nullable: true,
    lazy: true,
  })
  @Field(() => Route, {
    nullable: true,
  })
  parent?: Route;
}
