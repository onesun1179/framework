import {
  And,
  Any,
  Between,
  Equal,
  FindOperator,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  Like,
  MoreThan,
  Not,
} from 'typeorm';
import { entries, isNil } from 'lodash';
import { Regexp } from '@common/typeorm/find-operators/Regexp';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NullableStringSearchInput } from '@common/dto/input/search/nullable-string.search.input';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { UtilCommon } from '@common/util/Util.common';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export class UtilSearch {
  static setSearchByQB<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    search: ObjectLiteral,
  ): void {
    console.log({ search });
    qb.where(this.getSearchWhere(search));
  }

  static getSearchWhere(search: ObjectLiteral): FindOptionsWhere<any> {
    return entries(search).reduce((r, [k, v]) => {
      if (
        v instanceof NonNullableStringSearchInput ||
        v instanceof NullableStringSearchInput
      ) {
        r[k] = And(...this.getStringWhere(v));
      } else if (
        v instanceof NullableNumberSearchInput ||
        v instanceof NonNullableNumberSearchInput
      ) {
        r[k] = And(...this.getNumberWhere(v));
      }
      return r;
    }, {} as FindOptionsWhere<any>);
  }

  static string<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    param: NonNullableStringSearchInput | NullableStringSearchInput,
  ): void {
    qb.where(this.getStringWhere(param));
  }

  static getStringWhere(
    param: NonNullableStringSearchInput | NullableStringSearchInput,
  ): Array<FindOperator<string>> {
    const { like, ilike, regex, equal, any, in: _in } = param;

    const where: Array<FindOperator<string>> = [];
    if (
      param instanceof NullableStringSearchInput &&
      !isNil(param.isNull) &&
      param.isNull.value
    )
      where.push(IsNull());
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

  static number<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    param: NullableNumberSearchInput | NonNullableNumberSearchInput,
  ): void {
    qb.where(this.getNumberWhere(param));
  }

  static getNumberWhere(
    param: NullableNumberSearchInput | NonNullableNumberSearchInput,
  ): Array<FindOperator<number>> {
    const {
      equal,
      moreThan,
      in: _in,
      lessThan,

      between,
      any,
    } = param;
    const where: Array<FindOperator<number>> = [];
    if (
      param instanceof NullableNumberSearchInput &&
      !isNil(param.isNull) &&
      param.isNull.value
    )
      where.push(IsNull());

    if (!isNil(equal))
      UtilCommon.applyFuncWithArg(Equal(equal.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    if (!isNil(moreThan))
      UtilCommon.applyFuncWithArg(MoreThan(moreThan.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    if (!isNil(lessThan))
      UtilCommon.applyFuncWithArg(LessThan(lessThan.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    if (!isNil(_in))
      UtilCommon.applyFuncWithArg(In(_in.value), (arg) => {
        where.push(_in.not ? Not(arg) : arg);
      });
    if (!isNil(between))
      UtilCommon.applyFuncWithArg(Between(between.from, between.to), (arg) => {
        where.push(between.not ? Not(arg) : arg);
      });
    if (!isNil(any))
      UtilCommon.applyFuncWithArg(Any<any>(any.value), (arg) => {
        where.push(any.not ? Not(arg) : arg);
      });

    return where;
  }
}
