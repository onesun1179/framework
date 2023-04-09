import { MsgCode } from '@modules/message/dto/msg-code';

export class Response<T = null> {
  data: T;
  msg: string;
  msgCode: MsgCode;
}
