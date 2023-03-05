import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Menu } from './Menu';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class MenusAuths extends CommonEntity {
  @PrimaryColumn()
  menuId: number;

  @PrimaryColumn()
  authId: number;

  @ManyToOne(() => Menu, (o) => o.menusByAuthsList)
  @Field(() => Menu)
  menu: Menu;

  @ManyToOne(() => Auth, (o) => o.menusByAuthsList)
  @Field(() => Auth)
  auth: Auth;
}
