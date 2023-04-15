import { RoleEntity } from '@modules/role/entity';
import { UserEntity } from '@modules/user/entity';

export class AfterAT {
  userId!: UserEntity['id'];
  roleSeqNo!: RoleEntity['seqNo'];
}
