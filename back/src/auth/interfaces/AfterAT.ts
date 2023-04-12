import { Role } from '@modules/role/entities/role.entity';
import { User } from '@modules/user/models/user';

export class AfterAT {
  userId!: User['id'];
  roleSeqNo!: Role['seqNo'];
}
