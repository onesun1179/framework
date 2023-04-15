import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity';
import {
  IconGroupTreeEntity,
  IconIconGroupMapEntity,
} from '@modules/icon/entity';
import { Nullable } from 'src/common/type';
import { Type } from 'class-transformer';

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
