import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { IconGroupTree } from './icon-group-tree';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => IconIconGroupMap, (o) => o.iconGroup)
  iconIconGroupMaps: Array<IconIconGroupMap>;

  @OneToMany(() => IconGroupTree, (o) => o.child)
  @Field(() => [IconGroupTree])
  children: IconGroupTree[];

  @OneToMany(() => IconGroupTree, (o) => o.parent)
  @Field(() => [IconGroupTree])
  parents: IconGroupTree[];
}
