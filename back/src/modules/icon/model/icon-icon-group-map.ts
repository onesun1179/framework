import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Icon } from '@modules/icon/model/icon';
import { IconGroup } from '@modules/icon/model/icon-group';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconIconGroupMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => [String])
  iconId: Icon['id'];

  @PrimaryColumn()
  @Field(() => [Int])
  iconGroupSeqNo: IconGroup['seqNo'];

  @ManyToOne(() => Icon, (o) => o.iconIconGroupMaps)
  @Field(() => Icon)
  @JoinColumn({
    name: 'icon_id',
  })
  icon: Icon;

  @ManyToOne(() => IconGroup, (o) => o.iconIconGroupMaps)
  @Field(() => IconGroup)
  @JoinColumn({
    name: 'icon_group_seq_no',
  })
  iconGroup: IconGroup;
}
