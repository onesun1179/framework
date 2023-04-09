import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Menu } from '@modules/menu/model/menu';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlIcon')
export class Icon extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  filePath: string;

  @OneToMany(() => IconIconGroupMap, (o) => o.icon)
  iconIconGroupMaps: Array<IconIconGroupMap>;

  @OneToMany(() => Menu, (o) => o.icon, {
    nullable: true,
  })
  @Field(() => [Menu])
  menus: Array<Menu>;
}
