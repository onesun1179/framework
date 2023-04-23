import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@Entity('front_component')
@InputType({
  isAbstract: true,
})
@ObjectType(`FrontComponentEntityOutput`)
export class FrontComponentEntity extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => AllFrontComponentEntity, (o) => o.frontComponent, {
    nullable: true,
  })
  allFrontComponents?: Nullable<Array<AllFrontComponentEntity>>;

  @OneToMany(() => RoleFrontComponentMapEntity, (o) => o.frontComponent, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapEntity>>;

  @OneToMany(() => RouteEntity, (o) => o.frontComponent, {
    nullable: true,
  })
  routes?: Nullable<Array<RouteEntity>>;
}
