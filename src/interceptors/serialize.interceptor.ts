import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    console.log('I am running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        console.log('I am running before the response is sent out', data);
        return data;
      })
    );
  }
}