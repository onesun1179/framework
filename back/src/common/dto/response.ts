import { MsgCode } from '@modules/message/dto';

export class Response<T = null> {
  data!: T;
  msg!: string;
  msgCode!: MsgCode;
}
