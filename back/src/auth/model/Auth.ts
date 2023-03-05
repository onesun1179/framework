import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { AuthTree } from './AuthTree';
import { User } from '../../user/entity/User';
import { RoutesAuths } from '../../route/model/RoutesAuths';
import { MenusAuths } from '../../menu/model/MenusAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Auth extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  identifier?: string;

  @OneToMany(() => AuthTree, (o) => o.child)
  @Field(() => [AuthTree])
  childList: AuthTree[];

  @OneToMany(() => AuthTree, (o) => o.parent)
  @Field(() => [AuthTree])
  parentList: AuthTree[];

  @OneToMany(() => User, (o) => o.auth)
  @Field(() => [User])
  userList: User[];

  @OneToMany(() => MenusAuths, (o) => o.menu)
  @Field(() => [MenusAuths])
  menusByAuthsList: MenusAuths[];

  @OneToMany(() => RoutesAuths, (o) => o.route)
  @Field(() => [RoutesAuths])
  routesByAuthsList: RoutesAuths[];
}
