import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Icon } from './icon';
import { IconGroupTree } from './icon-group-tree';

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

  @OneToMany(() => Icon, (o) => o.iconGroup)
  @Field(() => [Icon])
  icons: Icon[];

  @OneToMany(() => IconGroupTree, (o) => o.child)
  @Field(() => [IconGroupTree])
  children: IconGroupTree[];

  @OneToMany(() => IconGroupTree, (o) => o.parent)
  @Field(() => [IconGroupTree])
  parents: IconGroupTree[];
}
