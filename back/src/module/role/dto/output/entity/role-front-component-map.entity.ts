import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';

@Entity('role_front_component_map')
@InputType({
  isAbstract: true,
})
@ObjectType(`RoleFrontComponentMapEntityOutput`)
export class RoleFrontComponentMapEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => String)
  frontComponentId!: string;

  @Column()
  @Field(() => String)
  allFrontComponentId!: string;

  @ManyToOne(() => RoleEntity, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  @Type(() => RoleEntity)
  role!: RoleEntity;

  @ManyToOne(() => FrontComponentEntity, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'front_component_id',
  })
  @Type(() => FrontComponentEntity)
  frontComponent!: FrontComponentEntity;

  @ManyToOne(() => AllFrontComponentEntity, (o) => o.roleFrontComponentMaps)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  @Type(() => AllFrontComponentEntity)
  allFrontComponent!: AllFrontComponentEntity;
}
