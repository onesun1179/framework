import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class MenusRequest {
  @Field(() => String, {
    nullable: true,
  })
  name?: Nullable<string>;

  @Field(() => Boolean, {
    nullable: true,
  })
  haveRouteYn?: Nullable<boolean>;
}
