import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RoleFrontComponentMapEntity } from '@modules/role/entity';
import { RouteEntity } from '@modules/route/entity';
import { AllFrontComponentEntity } from '@modules/front-component/entity';
import { Nullable } from 'src/common/type';

@Entity('front_component')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class FrontComponentEntity extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

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
