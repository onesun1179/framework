import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { Route } from '@modules/route/dto/route';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlFrontComponent')
export class FrontComponent extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @OneToMany(() => AllFrontComponent, (o) => o.frontComponent, {
    nullable: true,
  })
  allFrontComponents?: Nullable<Array<AllFrontComponent>>;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.frontComponent, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMap>>;

  @OneToMany(() => Route, (o) => o.frontComponent, {
    nullable: true,
  })
  routes?: Nullable<Array<Route>>;
}
