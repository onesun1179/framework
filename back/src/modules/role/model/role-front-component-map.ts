import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@modules/role/model/role';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { UtilField } from '@common/utils/util.field';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRoleFrontComponentMap', {
  description: UtilField.getFieldComment('role', 'front', 'component', 'map'),
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
  @Field(() => String, {
    description: UtilField.getFieldComment('front', 'component', 'id'),
  })
  frontComponentId: string;

  @Column({
    comment: UtilField.getFieldComment('all', 'front', 'component', 'id'),
  })
  @Field(() => String, {
    description: UtilField.getFieldComment('all', 'front', 'component', 'id'),
  })
  allFrontComponentId: string;

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

  @ManyToOne(() => AllFrontComponent, (o) => o.roleFrontComponentMaps)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  allFrontComponent: AllFrontComponent;
}
