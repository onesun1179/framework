import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class AllFrontComponent extends CommonEntity {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: string;

  @ManyToOne(() => FrontComponent, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: FrontComponent = null;

  @ManyToOne(() => RoleFrontComponentMap, (o) => o.allFrontComponent)
  roleFrontComponentMaps: Array<RoleFrontComponentMap>;
}
