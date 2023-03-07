import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/common.entity';
import { IconGroup } from './IconGroup';
import { Menu } from '../../menu/model/Menu';

@Entity()
@ObjectType()
export class Icon extends CommonEntity {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  filePath: string;

  @ManyToOne(() => IconGroup, (o) => o.iconList)
  @Field(() => IconGroup)
  iconGroup: IconGroup;

  @ManyToOne(() => Menu, (o) => o.icon)
  @Field(() => [Menu])
  menuList: Array<Menu>;
}
