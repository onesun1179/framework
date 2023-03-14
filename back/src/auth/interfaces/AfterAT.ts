import { Role } from '@modules/role/model/role';
import { User } from '@modules/user/models/user';

export class AfterAT {
  userId: User['id'];
  roleSeqNo: Role['seqNo'];
}
