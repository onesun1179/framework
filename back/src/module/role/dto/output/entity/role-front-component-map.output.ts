import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';

@Entity('role_front_component_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleFrontComponentMapOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => String)
  frontComponentId!: string;

  @Column()
  @Field(() => String)
  allFrontComponentId!: string;

  @ManyToOne(() => RoleOutput, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  @Type(() => RoleOutput)
  role!: RoleOutput;

  @ManyToOne(() => FrontComponentOutput, (o) => o.roleFrontComponentMaps)
  @JoinColumn({
    name: 'front_component_id',
  })
  @Type(() => FrontComponentOutput)
  frontComponent!: FrontComponentOutput;

  @ManyToOne(() => AllFrontComponentOutput, (o) => o.roleFrontComponentMaps)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  @Type(() => AllFrontComponentOutput)
  allFrontComponent!: AllFrontComponentOutput;
}
