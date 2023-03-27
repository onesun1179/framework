import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class MenusRequest {
  @Field(() => String, {
    nullable: true,
    description: '메뉴 명 (LIKE 검색)',
  })
  name: string;

  @Field(() => Boolean, {
    description: '라우트 보유 여부',
    nullable: true,
  })
  haveRouteYn: boolean;
}
