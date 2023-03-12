import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponentType } from './front-component-type';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Role } from '@modules/role/model/role';
import { Route } from '@modules/route/models/route';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class FrontComponent extends CommonEntity {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  frontComponentTypeSeqNo: number;

  @ManyToOne(() => FrontComponentType, (o) => o.frontComponents)
  @JoinColumn({
    name: 'front_component_type_seq_no',
  })
  frontComponentType: FrontComponentType;

  @OneToMany(() => AllFrontComponent, (o) => o.frontComponent)
  allFrontComponents: Array<AllFrontComponent>;

  @Column()
  @Field(() => String)
  initialFrontComponentId: string;

  @OneToOne(() => AllFrontComponent)
  @JoinColumn({
    name: 'initial_front_component_id',
  })
  initialFrontComponent: AllFrontComponent;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.frontComponent)
  roleFrontComponentMaps: Array<RoleFrontComponentMap>;

  roles: Array<Role>;

  @OneToMany(() => Route, (o) => o.frontComponent)
  routes: Array<Route>;
}
