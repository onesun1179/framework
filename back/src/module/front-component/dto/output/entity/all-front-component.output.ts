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
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';

@Entity('all_front_component')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class AllFrontComponentOutput extends CommonEntity {
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

  @ManyToOne(() => FrontComponentOutput, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  @Type(() => FrontComponentOutput)
  frontComponent?: Nullable<FrontComponentOutput>;

  @OneToMany(() => RoleFrontComponentMapOutput, (o) => o.allFrontComponent, {
    nullable: true,
  })
  @Type(() => RoleFrontComponentMapOutput)
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapOutput>>;
}
