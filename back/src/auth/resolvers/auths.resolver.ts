import { Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { Auth } from '../model/Auth';

@Resolver(() => Auth)
export class AuthsResolver {
  constructor(private authService: AuthService) {}
}
