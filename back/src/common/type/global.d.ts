import { LoginUser } from '@modules/user/user.type';

declare global {
  namespace Express {
    type User = LoginUser;
  }
}
