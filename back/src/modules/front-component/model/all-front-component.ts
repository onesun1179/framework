import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { FrontComponent } from '@modules/front-component/model/front-component';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('all', 'front', 'component'),
})
@ObjectType({
  description: UtilField.getFieldComment('all', 'front', 'component'),
})
export class AllFrontComponent extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('all', 'front', 'component', 'id'),
  })
  @Field(() => String, {
    description: UtilField.getFieldComment('all', 'front', 'component', 'id'),
  })
  id: string;

  @Column({
    comment: UtilField.getFieldComment('front', 'component', 'id'),
  })
  @Field(() => String, {
    description: UtilField.getFieldComment('front', 'component', 'id'),
  })
  frontComponentId: string;

  @ManyToOne(() => FrontComponent, (o) => o.allFrontComponents)
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent: FrontComponent;
}
