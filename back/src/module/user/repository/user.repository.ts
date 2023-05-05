import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';

@CustomRepository(UserOutput)
export class UserRepository extends Repository<UserOutput> {
  async hasRow(userId: string) {
    return await this.exist({
      where: {
        id: userId,
      },
    });
  }
}
