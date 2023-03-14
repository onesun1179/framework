import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../../common/entity/common.entity';
import { IconGroup } from './icon-group';
import { Menu } from '@modules/menu/model/menu';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class Icon extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  filePath: string;

  @Column()
  @Field(() => Int)
  iconGroupSeqNo: IconGroup['seqNo'];

  @ManyToOne(() => IconGroup, (o) => o.icons)
  @Field(() => IconGroup)
  @JoinColumn({
    name: 'icon_group_seq_no',
  })
  iconGroup: IconGroup;

  @ManyToOne(() => Menu, (o) => o.icon, {
    nullable: true,
  })
  @Field(() => [Menu], {
    nullable: true,
  })
  menus: Array<Menu>;
}
