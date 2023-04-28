import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';

@Entity('icon_label')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconLabelOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column({
    unique: true,
  })
  @Field()
  name!: string;

  @OneToMany(() => IconsIconLabelsOutput, (o) => o.iconLabel, {
    nullable: true,
  })
  @Type(() => IconsIconLabelsOutput)
  iconsIconLabelsList?: Array<IconsIconLabelsOutput>;
}
