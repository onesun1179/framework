import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/common.entity';
import { Icon } from './Icon';
import { IconGroupTree } from './IconGroupTree';

@Entity()
@ObjectType()
export class IconGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Icon, (o) => o.iconGroup)
  @Field(() => [Icon])
  iconList: Icon[];

  @OneToMany(() => IconGroupTree, (o) => o.child)
  @Field(() => [IconGroupTree])
  childList: IconGroupTree[];

  @OneToMany(() => IconGroupTree, (o) => o.parent)
  @Field(() => [IconGroupTree])
  parentList: IconGroupTree[];
}
