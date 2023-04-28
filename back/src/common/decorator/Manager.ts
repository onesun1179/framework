import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Manager = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return 'test';
  },
);
