import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { UserEntity } from '@modules/user/entity/user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
