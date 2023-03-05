import {
  Column,
  Entity,
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
export class FullRoute extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    nullable: true,
  })
  @Field()
  path?: string;

  @OneToOne(() => FrontComponent)
  @Field(() => FrontComponent)
  frontRoute: FrontComponent;

  @OneToMany(() => RoutesAuths, (o) => o.route, {
    nullable: true,
  })
  @Field(() => [RoutesAuths], {
    nullable: true,
  })
  routesAuths?: RoutesAuths[];
}
