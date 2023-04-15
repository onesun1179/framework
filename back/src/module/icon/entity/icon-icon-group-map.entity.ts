import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { IconEntity } from '../../icon/entity/icon.entity';
import { IconGroupEntity } from '../../icon/entity/icon-group.entity';
import { Type } from 'class-transformer';

@Entity('icon_icon_group_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconIconGroupMapEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  iconSeqNo!: IconEntity['seqNo'];

  @PrimaryColumn()
  @Field(() => Int)
  iconGroupSeqNo!: IconGroupEntity['seqNo'];

  @ManyToOne(() => IconEntity, (o) => o.iconIconGroupMaps)
  @JoinColumn({
    name: 'icon_seq_no',
  })
  @Type(() => IconEntity)
  icon!: IconEntity;

  @ManyToOne(() => IconGroupEntity, (o) => o.iconIconGroupMaps)
  @JoinColumn({
    name: 'icon_group_seq_no',
  })
  @Type(() => IconGroupEntity)
  iconGroup!: IconGroupEntity;
}
