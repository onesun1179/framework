import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessToken } from '@auth/interfaces/AccessToken';
import { UserEntity } from '@modules/user/entity/user.entity';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { userId } = ctx.getContext().req.user as AccessToken;
    const { roleSeqNo } = await UserEntity.createQueryBuilder(`u`)
      .where(`u.id = :userId`, {
        userId,
      })
      .getOneOrFail();
    return {
      roleSeqNo,
      userId,
    };
  },
);
