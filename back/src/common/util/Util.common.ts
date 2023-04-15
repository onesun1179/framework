import { Func } from 'src/common/type';
import { isArray } from 'lodash';

export class UtilCommon {
  static invokeIf<T>(condition: boolean, func: Func<T>): T | undefined {
    if (condition) {
      return func();
    }
  }
  static applyFuncWithArg<T>(arg: T, func: (arg: T) => any) {
    func(arg);
  }

  static toArray<T>(arg: T | T[]): T[] {
    if (isArray(arg)) {
      return arg;
    } else {
      return [arg];
    }
  }
}
