import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Nullable } from 'src/common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconIconGroupMapEntity } from '@modules/icon/entity/icon-icon-group-map.entity';
import { IconGroupTreeEntity } from '@modules/icon/entity/icon-group-tree.entity';

@Entity('icon_group')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroupEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => IconIconGroupMapEntity, (o) => o.iconGroup, {
    nullable: true,
  })
  @Type(() => IconIconGroupMapEntity)
  iconIconGroupMaps?: Nullable<Array<IconIconGroupMapEntity>>;

  @OneToMany(() => IconGroupTreeEntity, (o) => o.child)
  @Type(() => IconGroupTreeEntity)
  children?: Nullable<IconGroupTreeEntity[]>;

  @OneToMany(() => IconGroupTreeEntity, (o) => o.parent)
  @Type(() => IconGroupTreeEntity)
  parents?: Nullable<IconGroupTreeEntity[]>;
}
