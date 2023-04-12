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
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlAllFrontComponent')
export class AllFrontComponent extends CommonEntity {
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

  @ManyToOne(() => FrontComponent, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: Nullable<FrontComponent>;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.allFrontComponent, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMap>>;
}
