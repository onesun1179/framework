import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { RoutesAuths } from './RoutesAuths';
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

  @OneToMany(() => Route, (o) => o.id)
  @Field(() => [Route])
  children?: Route[];

  @ManyToOne(() => Route, (o) => o.id, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id',
  })
  @Field(() => Route, {
    nullable: true,
  })
  parent?: Route;

  @OneToMany(() => RoutesAuths, (o) => o.route, {
    nullable: true,
  })
  @Field(() => [RoutesAuths], {
    nullable: true,
  })
  routesAuthsList?: RoutesAuths[];
}
