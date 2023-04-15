import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { IconGroupEntity } from '@modules/icon/entity/icon-group.entity';

@Entity('icon_icon_group_map')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconIconGroupMapEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  iconSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  iconGroupSeqNo!: number;

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
