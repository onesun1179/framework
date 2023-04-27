import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@Entity('front_component')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class FrontComponentOutput extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => AllFrontComponentOutput, (o) => o.frontComponent, {
    nullable: true,
  })
  allFrontComponents?: Nullable<Array<AllFrontComponentOutput>>;

  @OneToMany(() => RoleFrontComponentMapOutput, (o) => o.frontComponent, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapOutput>>;

  @OneToMany(() => RouteOutput, (o) => o.frontComponent, {
    nullable: true,
  })
  routes?: Nullable<Array<RouteOutput>>;
}
