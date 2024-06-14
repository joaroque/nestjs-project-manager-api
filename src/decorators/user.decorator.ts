import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException('User not found. Use AuthGuard');
    }

    if (!filter) {
      return request.user;
    }

    return request.user[filter];
  },
);
