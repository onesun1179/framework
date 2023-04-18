import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';

@Entity('all_front_component')
@InputType({
  isAbstract: true,
})
@ObjectType(`AllFrontComponentEntityOutput`)
export class AllFrontComponentEntity extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: Nullable<string>;

  @ManyToOne(() => FrontComponentEntity, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  @Type(() => FrontComponentEntity)
  frontComponent?: Nullable<FrontComponentEntity>;

  @OneToMany(() => RoleFrontComponentMapEntity, (o) => o.allFrontComponent, {
    nullable: true,
  })
  @Type(() => RoleFrontComponentMapEntity)
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapEntity>>;
}
