import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessToken } from '../../auth/interfaces/AccessToken';
import { User } from '@modules/user/models/user';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { userId } = ctx.getContext().req.user as AccessToken;

    const { roleSeqNo } = await User.findOne({
      select: ['roleSeqNo'],
      where: {
        id: userId,
      },
    });
    return {
      roleSeqNo,
      userId,
    };
  },
);
