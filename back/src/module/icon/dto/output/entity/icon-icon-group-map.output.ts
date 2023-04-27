import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { IconGroupOutput } from '@modules/icon/dto/output/entity/icon-group.output';

@Entity('icon_icon_group_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconIconGroupMapOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  iconSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  iconGroupSeqNo!: number;

  @ManyToOne(() => IconOutput, (o) => o.iconIconGroupMaps)
  @JoinColumn({
    name: 'icon_seq_no',
  })
  @Type(() => IconOutput)
  icon!: IconOutput;

  @ManyToOne(() => IconGroupOutput, (o) => o.iconIconGroupMaps)
  @JoinColumn({
    name: 'icon_group_seq_no',
  })
  @Type(() => IconGroupOutput)
  iconGroup!: IconGroupOutput;
}
