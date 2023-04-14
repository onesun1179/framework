import { FindOperator, Raw } from 'typeorm';

export function Regexp(value: string) {
  return Raw(
    (columnAlias) => `${columnAlias} Regexp ('${value}')`,
  ) as unknown as FindOperator<string>;
}
