import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/common.entity';
import { Icon } from './Icon';
import { IconGroupTree } from './IconGroupTree';

@Entity()
@ObjectType({
  description: '아이콘 그룹',
})
export class IconGroup extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '아이콘 그룹 일련번호',
  })
  @Field(() => Int, {
    description: '아이콘 그룹 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '아이콘 그룹 명',
  })
  @Field({
    description: '아이콘 그룹 명',
  })
  name: string;

  @OneToMany(() => Icon, (o) => o.iconGroup)
  @Field(() => [Icon], {
    description: '아이콘 목록',
  })
  icons: Icon[];

  @OneToMany(() => IconGroupTree, (o) => o.child)
  @Field(() => [IconGroupTree], {
    description: '자식들',
  })
  children: IconGroupTree[];

  @OneToMany(() => IconGroupTree, (o) => o.parent)
  @Field(() => [IconGroupTree], {
    description: '부모들',
  })
  parents: IconGroupTree[];
}
