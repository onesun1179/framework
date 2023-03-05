import { registerEnumType } from '@nestjs/graphql';

export enum FRONT_COMPONENT_MAP {
  login = 'login',
  home = 'home',
}

export const FRONT_COMPONENT_TYPE_GROUP_MAP: {
  [TypeName: string]: Array<keyof typeof FRONT_COMPONENT_MAP>;
} = {
  라우트: ['login'],
  '라우트 parent': ['home'],
};

registerEnumType(FRONT_COMPONENT_MAP, {
  name: 'FrontComponentIdEnum',
});
