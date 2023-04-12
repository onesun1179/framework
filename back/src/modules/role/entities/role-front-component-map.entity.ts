import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@modules/role/entities/role.entity';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRoleFrontComponentMap')
export class RoleFrontComponentMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo!: number;

  @PrimaryColumn()
  @Field(() => String)
  frontComponentId!: string;

  @Column()
  @Field(() => String)
  allFrontComponentId!: string;

  @ManyToOne(() => Role, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role!: Role;

  @ManyToOne(() => FrontComponent, (r) => r.roleFrontComponentMaps)
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent!: FrontComponent;

  @ManyToOne(() => AllFrontComponent, (o) => o.roleFrontComponentMaps)
  @JoinColumn({
    name: 'all_front_component_id',
  })
  allFrontComponent!: AllFrontComponent;
}
