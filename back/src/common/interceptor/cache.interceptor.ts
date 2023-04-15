import { CallHandler, Inject, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CACHE_KEY_METADATA, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';

const REFLECTOR = 'Reflector';

export class GraphqlCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly reflector: Reflector,
  ) {}
  private getGqlCtx(ctx: ExecutionContextHost): GqlExecutionContext {
    return GqlExecutionContext.create(ctx);
  }

  intercept(
    context: ExecutionContextHost,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('intercept');
    const ctx = this.getGqlCtx(context);

    if (!ctx) {
      return next.handle();
    }
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
    console.log({
      cacheMetadata,
    });
    return next.handle();
  }
}
