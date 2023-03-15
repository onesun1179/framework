import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { Menu } from '@modules/menu/model/menu';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';

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

  @OneToMany(() => IconIconGroupMap, (o) => o.icon)
  iconIconGroupMaps: Array<IconIconGroupMap>;

  @ManyToOne(() => Menu, (o) => o.icon, {
    nullable: true,
  })
  @Field(() => [Menu], {
    nullable: true,
  })
  menus: Array<Menu>;
}
