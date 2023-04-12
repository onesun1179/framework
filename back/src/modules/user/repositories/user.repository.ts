import { Repository } from 'typeorm';
import { User } from '@modules/user/models/user';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
