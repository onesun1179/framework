import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => FrontComponent, {
    nullable: true,
  })
  @Field(() => FrontComponent, {
    nullable: true,
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => Route, (o) => o.parent, {
    nullable: true,
  })
  @Field(() => [Route], {
    nullable: true,
  })
  children: Route[];

  @ManyToOne(() => Route, (o) => o.children, {
    nullable: true,
  })
  @Field(() => Route, {
    nullable: true,
  })
  parent: Route;
}
