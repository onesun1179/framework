import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { User } from '../../user/entity/User';
import { FullRoutesAuths } from '../../route/model/FullRoutesAuths';
import { MenusAuths } from '../../menu/model/MenusAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthGroup } from './AuthGroup';

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

  @ManyToOne(() => AuthGroup, (o) => o.authList, {
    nullable: false,
  })
  @Field(() => AuthGroup, {
    nullable: false,
  })
  authGroup: AuthGroup;

  @OneToMany(() => User, (o) => o.auth)
  @Field(() => [User])
  userList: User[];

  @OneToMany(() => MenusAuths, (o) => o.menu)
  @Field(() => [MenusAuths])
  menusAuths: MenusAuths[];

  @OneToMany(() => FullRoutesAuths, (o) => o.fullRoute)
  @Field(() => [FullRoutesAuths])
  fullRoutesAuths: FullRoutesAuths[];
}
