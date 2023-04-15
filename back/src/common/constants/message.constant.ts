import { MsgCode } from '@modules/message/dto';

const make =
  (groupCode: string, code: string) =>
  (data: Array<string | number> = []) =>
    new MsgCode(groupCode, code, data);
export const MessageConstant = {
  // 실패
  FAIL: make('E', '0000'),
  // SQL 실패
  SQL_FAIL: make('E', '0001'),
  // 일반
  PRIMARY: make('P', '0000'),
  // 존재하지 않는 값
  NOT_FOUND_VALUE: make('E', '0002'),
};
