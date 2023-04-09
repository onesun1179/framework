import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Route } from '@modules/route/models/route';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { UtilField } from '@common/utils/util.field';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlFrontComponent', {
  description: UtilField.getFieldComment('front', 'component'),
})
export class FrontComponent extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('id'),
  })
  @Field({
    description: UtilField.getFieldComment('id'),
  })
  id: string;

  @OneToMany(() => AllFrontComponent, (o) => o.frontComponent, {
    nullable: true,
  })
  allFrontComponents?: Array<AllFrontComponent>;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.frontComponent, {
    nullable: true,
  })
  roleFrontComponentMaps?: Array<RoleFrontComponentMap>;

  @OneToMany(() => Route, (o) => o.frontComponent, {
    nullable: true,
  })
  routes?: Array<Route>;
}
