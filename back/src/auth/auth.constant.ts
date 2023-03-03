import { AuthEntity } from './entity/auth.entity';
import { Builder } from 'builder-pattern';

export const JWT_SECRET = 'dongwon';
export const GUEST_AUTH = Builder(AuthEntity, {
  name: '손님',
  identifier: 'GUEST',
}).build();
export const DEVELOPER_AUTH = Builder(AuthEntity, {
  name: '개발자',
  identifier: 'DEVELOPER',
}).build();

export const INITIAL_AUTH_LIST: AuthEntity[] = [GUEST_AUTH, DEVELOPER_AUTH];
export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
