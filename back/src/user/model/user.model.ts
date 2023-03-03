import { Field } from '@nestjs/graphql';
import { Auth } from '../../auth/model/auth.model';
import { UserEntity } from '../entity/user.entity';

export class User {
  @Field()
  id: UserEntity['id'];

  @Field(() => Auth)
  auth: Auth;
}
