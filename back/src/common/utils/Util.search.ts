import { StringSearchInput } from '@common/dto/inputs/search/string.search.input';
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
import { NumberSearchInput } from '@common/dto/inputs/search/number.search.input';
import { entries, isBoolean, isNil } from 'lodash';
import { UtilCommon } from '@common/utils/util.common';
import { Regexp } from '@common/typeorm/find-operators/Regexp';
import { Type } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export class UtilSearch {
  static bulkSearch<T extends Type>(p: InstanceType<T>): FindOptionsWhere<T> {
    return entries(p).reduce((r, [k, v]) => {
      if (v instanceof StringSearchInput) {
        // @ts-ignore
        r[k] = And(...UtilSearch.string(v));
      } else if (v instanceof NumberSearchInput) {
        // @ts-ignore
        r[k] = And(...UtilSearch.number(v));
      }

      return r;
    }, {} as FindOptionsWhere<T>);
  }
  static string({
    isNull,
    like,
    ilike,
    regex,
    equal,
    any,
    in: _in,
  }: StringSearchInput): Array<FindOperator<string>> {
    const where: Array<FindOperator<string>> = [];
    if (isBoolean(isNull)) where.push(isNull ? IsNull() : Not(IsNull()));
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

  static number({
    equal,
    lessThanOrEqual,
    moreThanOrEqual,
    moreThan,
    in: _in,
    lessThan,
    isNull,
    between,
    any,
  }: NumberSearchInput): Array<FindOperator<number>> {
    const where: Array<FindOperator<number>> = [];
    if (isBoolean(isNull)) where.push(isNull ? IsNull() : Not(IsNull()));
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
