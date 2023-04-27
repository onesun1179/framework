import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconIconGroupMapOutput } from '@modules/icon/dto/output/entity/icon-icon-group-map.output';
import { IconGroupTreeOutput } from '@modules/icon/dto/output/entity/icon-group-tree.output';

@Entity('icon_group')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroupOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => IconIconGroupMapOutput, (o) => o.iconGroup, {
    nullable: true,
  })
  @Type(() => IconIconGroupMapOutput)
  iconIconGroupMaps?: Nullable<Array<IconIconGroupMapOutput>>;

  @OneToMany(() => IconGroupTreeOutput, (o) => o.child)
  @Type(() => IconGroupTreeOutput)
  children?: Nullable<IconGroupTreeOutput[]>;

  @OneToMany(() => IconGroupTreeOutput, (o) => o.parent)
  @Type(() => IconGroupTreeOutput)
  parents?: Nullable<IconGroupTreeOutput[]>;
}
