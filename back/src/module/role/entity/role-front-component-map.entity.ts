import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/entity';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { Type } from 'class-transformer';

@Entity('role_front_component_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
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
