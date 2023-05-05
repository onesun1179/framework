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
  Raw,
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
    qb.andWhere(this.getSearchWhere(search));
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
    qb.andWhere(this.getStringWhere(param));
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
    UtilCommon.nilToNull(equal, (p) => {
      UtilCommon.applyFuncWithArg(Equal(p.value), (arg) =>
        where.push(equal!.not ? Not(arg) : arg),
      );
    });
    UtilCommon.nilToNull(_in, (p) => {
      UtilCommon.applyFuncWithArg(In(p.value), (arg) => {
        where.push(p.not ? Not(arg) : arg);
      });
    });
    UtilCommon.nilToNull(any, (_any) => {
      UtilCommon.applyFuncWithArg(Any<any>(_any.value), (arg) => {
        where.push(_any.not ? Not(arg) : arg);
      });
    });
    UtilCommon.nilToNull(like, (_like) => {
      UtilCommon.applyFuncWithArg(Like(_like.value), (arg) => {
        where.push(_like.not ? Not(arg) : arg);
      });
    });
    UtilCommon.nilToNull(ilike, (_ilike) => {
      UtilCommon.applyFuncWithArg(ILike(_ilike.value), (arg) => {
        where.push(_ilike.not ? Not(arg) : arg);
      });
    });

    UtilCommon.nilToNull(regex, (_regex) => {
      UtilCommon.applyFuncWithArg(Regexp(_regex.value), (arg) => {
        where.push(_regex.not ? Not(arg) : arg);
      });
    });

    return where;
  }

  static number<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    param: NullableNumberSearchInput | NonNullableNumberSearchInput,
  ): void {
    qb.andWhere(this.getNumberWhere(param));
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

    UtilCommon.nilToNull(equal, (_equal) => {
      UtilCommon.applyFuncWithArg(Equal(_equal.value), (arg) =>
        where.push(
          equal!.not
            ? Raw(
                (columnAlias) =>
                  `(${columnAlias} != ${_equal.value} OR ${columnAlias} is null)`,
              )
            : arg,
        ),
      );
    });
    UtilCommon.nilToNull(moreThan, (p) => {
      UtilCommon.applyFuncWithArg(MoreThan(p.value), (arg) =>
        where.push(p!.not ? Not(arg) : arg),
      );
    });
    UtilCommon.nilToNull(lessThan, (p) => {
      UtilCommon.applyFuncWithArg(LessThan(p.value), (arg) =>
        where.push(p!.not ? Not(arg) : arg),
      );
    });

    UtilCommon.nilToNull(_in, (p) => {
      UtilCommon.applyFuncWithArg(In(p.value), (arg) => {
        where.push(p.not ? Not(arg) : arg);
      });
    });
    UtilCommon.nilToNull(between, (p) => {
      UtilCommon.applyFuncWithArg(Between(p.from, p.to), (arg) => {
        where.push(p.not ? Not(arg) : arg);
      });
    });
    UtilCommon.nilToNull(any, (p) => {
      UtilCommon.applyFuncWithArg(Any<any>(p.value), (arg) => {
        where.push(p.not ? Not(arg) : arg);
      });
    });

    return where;
  }
}
