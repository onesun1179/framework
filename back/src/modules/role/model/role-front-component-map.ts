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
import { UtilField } from '@util/Util.field';
import { Role } from '@modules/role/model/role';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('role', 'by', 'front', 'component'),
})
@ObjectType({
  description: UtilField.getFieldComment('role', 'by', 'front', 'component'),
})
export class RoleFrontComponentMap extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('role', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'seqNo'),
  })
  roleSeqNo: number;

  @PrimaryColumn({
    comment: UtilField.getFieldComment('front', 'component', 'id'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('front', 'component', 'id'),
  })
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

  @Column({
    comment: UtilField.getFieldComment('all', 'front', 'component', 'id'),
  })
  allFrontComponentId: string;

  @OneToOne(() => AllFrontComponent)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  allFrontComponent: AllFrontComponent;
}
