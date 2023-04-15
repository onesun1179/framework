import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import {
  And,
  Any,
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { entries, isBoolean, isNil } from 'lodash';
import { UtilCommon } from '@util/Util.common';
import { Regexp } from '@common/typeorm/find-operators/Regexp';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { NullableStringSearchInput } from '@common/dto/input/search/nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';

export class UtilSearch {
  static getFindOptionsWhere<T extends ObjectLiteral>(
    p: T,
  ): FindOptionsWhere<any> {
    return entries(p).reduce((r, [k, v]) => {
      if (
        v instanceof NonNullableStringSearchInput ||
        v instanceof NullableStringSearchInput
      ) {
        // @ts-ignore
        r[k] = And(...UtilSearch.string(v));
      } else if (
        v instanceof NullableNumberSearchInput ||
        v instanceof NonNullableNumberSearchInput
      ) {
        // @ts-ignore
        r[k] = And(...UtilSearch.number(v));
      }
      return r;
    }, {});
  }
  static string(
    param: NonNullableStringSearchInput | NullableStringSearchInput,
  ): Array<FindOperator<string>> {
    const { like, ilike, regex, equal, any, in: _in } = param;
    const where: Array<FindOperator<string>> = [];
    if (param instanceof NullableStringSearchInput && isBoolean(param.isNull))
      where.push(param.isNull ? IsNull() : Not(IsNull()));
    if (!isNil(equal))
      UtilCommon.applyFuncWithArg(Equal(equal.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    if (!isNil(_in))
      UtilCommon.applyFuncWithArg(In(_in.value), (arg) => {
        where.push(_in.not ? Not(arg) : arg);
      });
    if (!isNil(any))
      UtilCommon.applyFuncWithArg(Any<any>(any.value), (arg) => {
        where.push(any.not ? Not(arg) : arg);
      });
    if (!isNil(like))
      UtilCommon.applyFuncWithArg(Like(like.value), (arg) => {
        where.push(like.not ? Not(arg) : arg);
      });
    if (!isNil(ilike))
      UtilCommon.applyFuncWithArg(ILike(ilike.value), (arg) => {
        where.push(ilike.not ? Not(arg) : arg);
      });
    if (!isNil(regex))
      UtilCommon.applyFuncWithArg(Regexp(regex.value), (arg) => {
        where.push(regex.not ? Not(arg) : arg);
      });

    return where;
  }

  static number(
    param: NullableNumberSearchInput | NonNullableNumberSearchInput,
  ): Array<FindOperator<number>> {
    const {
      equal,
      lessThanOrEqual,
      moreThanOrEqual,
      moreThan,
      in: _in,
      lessThan,

      between,
      any,
    } = param;
    const where: Array<FindOperator<number>> = [];
    if (param instanceof NullableNumberSearchInput && isBoolean(param.isNull))
      where.push(param.isNull ? IsNull() : Not(IsNull()));
    if (!isNil(equal))
      UtilCommon.applyFuncWithArg(Equal(equal.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    if (!isNil(lessThanOrEqual)) where.push(LessThanOrEqual(lessThanOrEqual));
    if (!isNil(moreThanOrEqual)) where.push(MoreThanOrEqual(moreThanOrEqual));
    if (!isNil(moreThan)) where.push(MoreThan(moreThan));
    if (!isNil(_in))
      UtilCommon.applyFuncWithArg(In(_in.value), (arg) => {
        where.push(_in.not ? Not(arg) : arg);
      });
    if (!isNil(lessThan)) where.push(LessThan(lessThan));
    if (!isNil(between)) where.push(Between(between.from, between.to));
    if (!isNil(any))
      UtilCommon.applyFuncWithArg(Any<any>(any.value), (arg) => {
        where.push(any.not ? Not(arg) : arg);
      });

    return where;
  }
}
