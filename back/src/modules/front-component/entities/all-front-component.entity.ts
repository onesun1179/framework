import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { UtilField } from '@common/utils/util.field';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlAllFrontComponent', {
  description: UtilField.getFieldComment('all', 'front', 'component'),
})
export class AllFrontComponent extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('id'),
  })
  @Field({
    description: UtilField.getFieldComment('id'),
  })
  id: string;

  @Column({
    nullable: true,
    comment: UtilField.getFieldComment('front', 'component', 'id'),
  })
  @Field({
    nullable: true,
    description: UtilField.getFieldComment('front', 'component', 'id'),
  })
  frontComponentId?: string;

  @ManyToOne(() => FrontComponent, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: FrontComponent;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.allFrontComponent)
  roleFrontComponentMaps: Array<RoleFrontComponentMap>;
}
