import { GraphQLError } from 'graphql/error';
import { MsgCode } from '@modules/message/dto/msg-code';

export class GqlError extends GraphQLError {
  msgCode: MsgCode;

  constructor(msgCode: MsgCode) {
    super('', {
      extensions: {
        ...msgCode,
      },
    });
    this.msgCode = msgCode;
  }

  setMessage(msg: string) {
    this.message = msg;
  }
}
