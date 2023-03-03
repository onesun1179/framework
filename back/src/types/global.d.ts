import { LoginUser } from '../user/user.type';

declare global {
  namespace Express {
    type User = LoginUser;
  }
}
