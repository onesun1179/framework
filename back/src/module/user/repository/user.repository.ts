import { Repository } from 'typeorm';
import { UserEntity } from '@modules/user/entity';
import { CustomRepository } from '@common/decorator/CustomRepository';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
