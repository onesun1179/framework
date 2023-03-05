import { Auth } from './model/Auth';
import { Builder } from 'builder-pattern';

export const JWT_SECRET = 'dongwon';
export const GUEST_AUTH = Builder(Auth, {
  name: '손님',
  identifier: 'GUEST',
}).build();
export const DEVELOPER_AUTH = Builder(Auth, {
  name: '개발자',
  identifier: 'DEVELOPER',
}).build();

export const INITIAL_AUTH_LIST: Auth[] = [GUEST_AUTH, DEVELOPER_AUTH];
export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
