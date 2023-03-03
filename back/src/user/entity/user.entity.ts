import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { LoginUser } from '../user.type';
import { CommonEntity } from '../../common/entity/common.entity';
import { AuthEntity } from '../../auth/entity/auth.entity';

@Entity({
  name: 'user',
})
export class UserEntity
  extends CommonEntity
  implements
    Omit<
      LoginUser,
      'accessToken' | 'provider' | 'providerId' | 'name' | 'email'
    >
{
  @PrimaryColumn({
    comment: '구글 id',
    type: 'varchar',
    length: 50,
  })
  id: string;

  @ManyToOne(() => AuthEntity, (o) => o.userList, {
    eager: true,
  })
  auth: AuthEntity;
}
