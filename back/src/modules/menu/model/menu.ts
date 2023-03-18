import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { MenuRoleMap } from './menu-role-map';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Icon } from '@modules/icon/model/icon';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  iconSeqNo?: number;

  @ManyToOne(() => Icon, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  icon?: Icon;

  @OneToMany(() => MenuRoleMap, (o) => o.menu)
  menuRoleMaps: Array<MenuRoleMap>;

  children: Array<Menu>;
}
