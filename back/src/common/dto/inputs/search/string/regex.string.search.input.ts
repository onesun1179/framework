import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from '@common/types';
import { IsNotEmpty } from 'class-validator';

@InputType()
@ArgsType()
export class RegexStringSearchInput {
  @Field(() => String)
  @IsNotEmpty()
  value!: string;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not?: Nullable<boolean>;
}
