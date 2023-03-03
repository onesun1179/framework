import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { AuthTreeEntity } from './authTree.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { PathsByAuthsEntity } from '../../path/entity/pathsByAuths.entity';
import { MenusByAuthsEntity } from '../../menu/entity/menusByAuths.entity';
import { Builder } from 'builder-pattern';
import { Auth } from '../model/auth.model';

@Entity({
  name: 'auth',
})
export class AuthEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '권한 id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '권한 명',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '권한 식별자',
    nullable: true,
    unique: true,
  })
  identifier?: string;

  @OneToMany(() => AuthTreeEntity, (o) => o.child)
  childList?: AuthTreeEntity[];

  @OneToMany(() => AuthTreeEntity, (o) => o.parent)
  parentList?: AuthTreeEntity[];

  @OneToMany(() => UserEntity, (o) => o.auth)
  userList?: UserEntity[];

  @OneToMany(() => MenusByAuthsEntity, (o) => o.menu)
  menusByAuthsList?: MenusByAuthsEntity[];

  @OneToMany(() => PathsByAuthsEntity, (o) => o.path)
  pathsByAuthsList: PathsByAuthsEntity[];

  toAuth(): Auth {
    return Builder(Auth, {
      id: this.id,
      name: this.name,
      identifier: this.identifier,
      children: [],
    }).build();
  }
}
