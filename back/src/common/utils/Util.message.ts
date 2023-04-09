import { isInteger } from 'lodash';

export class UtilMessage {
  static text(text: string, data: Array<string | number> = []) {
    // 0 - 999
    return text.replace(/{{([0-9]|[1-9][0-9]|[1-9][0-9][0-9])}}/g, (s, a) => {
      const num = a * 1;

      if (isInteger(num) && !!data[num]) {
        return data[num] + '';
      }

      return s;
    });
  }
}
