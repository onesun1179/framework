import { MsgCode } from '@modules/message/dto/msg-code';

export const MessageConstant = {
  // 실패
  FAIL: () => new MsgCode('E', '0000'),
  // SQL 실패
  SQL_FAIL: () => new MsgCode('E', '0001'),
  // 일반
  PRIMARY: () => new MsgCode('P', '0000'),
  // 존재하지 않는 키
  NONE_KEY: () => new MsgCode('E', '0002'),
};
