import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user-dto';



interface ClassConstructor {
  new (...args : any []) : {}
}

export function Serialize (dto : ClassConstructor) {
 return UseInterceptors(new SerializeInterceptor(dto));
}
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor  (private dto : any) {};
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    // console.log('I am running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // console.log(data , "dataaa")
        // console.log('I am running before the response is sent out', data);
        // return data;
      return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}