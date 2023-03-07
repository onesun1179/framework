import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { User } from '../../user/models/User';
import { RoutesAuths } from '../../route/models/RoutesAuths';
import { MenusAuths } from '../../menu/model/MenusAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthGroup } from './AuthGroup';
import { Menu } from '../../menu/model/Menu';
import { Route } from '../../route/models/Route';

@Entity()
@ObjectType({
  description: '권한',
})
export class Auth extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '권한 일련번호',
  })
  @Field(() => Int, {
    description: '권한 일련번호',
  })
  seqNo: number;
  @Column({
    comment: '권한 명',
  })
  @Field({
    description: '권한 명',
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    nullable: true,
    update: false,
    comment: '권한 식별자',
  })
  @Field({
    nullable: true,
    description: '권한 식별자',
  })
  identifier?: string;
  @Column()
  @Field(() => Int, {
    description: '권한 그룹 일련번호',
  })
  authGroupSeqNo: number;
  @ManyToOne(() => AuthGroup, (o) => o.auths, {
    nullable: false,
    lazy: true,
  })
  @Field(() => AuthGroup, {
    nullable: false,
    description: '권한 그룹',
  })
  @JoinColumn({
    name: 'auth_group_seq_no',
  })
  authGroup: AuthGroup;
  @OneToMany(() => User, (o) => o.auth, {
    lazy: true,
  })
  @Field(() => [User], {
    description: '사용자 목록',
  })
  users: User[];
  @Field(() => [Menu], {
    description: '메뉴 목록',
  })
  menus: Menu[];

  @Field(() => [Route], {
    description: '경로 목록',
  })
  routes: Route[];

  /************************************
   *            only join
   **************************************/
  @OneToMany(() => RoutesAuths, (o) => o.route, {
    lazy: true,
  })
  routesAuths: RoutesAuths[];

  @OneToMany(() => MenusAuths, (o) => o.menu, {
    lazy: true,
  })
  menusAuths: MenusAuths[];
}
