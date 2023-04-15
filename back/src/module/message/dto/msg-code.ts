import { UtilMessage } from '@common/util/Util.message';

export class MsgCode<T extends string | number = string | number> {
  groupCode: string;
  code: string;
  data: Array<T> = [];

  constructor(groupCode: string, code: string, data: Array<T> = []) {
    this.groupCode = groupCode;
    this.code = code;
    this.data = data;
  }

  text(text: string) {
    return UtilMessage.text(text, this.data);
  }
}
