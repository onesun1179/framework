import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { IconGroupTree } from './icon-group-tree';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlIconGroup')
export class IconGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => IconIconGroupMap, (o) => o.iconGroup, {
    nullable: true,
  })
  iconIconGroupMaps?: Nullable<Array<IconIconGroupMap>>;

  @OneToMany(() => IconGroupTree, (o) => o.child)
  children?: Nullable<IconGroupTree[]>;

  @OneToMany(() => IconGroupTree, (o) => o.parent)
  parents?: Nullable<IconGroupTree[]>;
}
