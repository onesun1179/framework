import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@modules/role/model/role';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleFrontComponentMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo: number;

  @PrimaryColumn()
  @Field(() => String)
  frontComponentId: string;

  @ManyToOne(() => Role, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;

  @ManyToOne(() => FrontComponent, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent: FrontComponent;

  @Column()
  allFrontComponentId: string;

  @OneToOne(() => AllFrontComponent)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  allFrontComponent: AllFrontComponent;
}
