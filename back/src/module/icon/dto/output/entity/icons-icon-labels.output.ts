import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';

@Entity('icons_icon_labels')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconsIconLabelsOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  iconSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  iconLabelSeqNo!: number;

  @JoinColumn({
    name: 'icon_seq_no',
  })
  @ManyToOne(() => IconOutput, (o) => o.iconsIconLabelsList)
  @Type(() => IconOutput)
  icon!: IconOutput;

  @JoinColumn({
    name: 'icon_label_seq_no',
  })
  @ManyToOne(() => IconLabelOutput, (o) => o.iconsIconLabelsList)
  @Type(() => IconLabelOutput)
  iconLabel!: IconLabelOutput;
}
