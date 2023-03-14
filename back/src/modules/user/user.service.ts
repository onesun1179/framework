import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user';
import { LoginUser } from './user.type';
import { Role } from '@modules/role/model/role';
import { AppMetadataConstant } from '@modules/app-metadata/app-metadata.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveNewMember(loginUser: LoginUser): Promise<User> {
    return await User.save(
      User.create({
        id: loginUser.id,
        role: await Role.findOneBy({
          identifier: AppMetadataConstant.guestId,
        }),
      }),
    );
  }
}
