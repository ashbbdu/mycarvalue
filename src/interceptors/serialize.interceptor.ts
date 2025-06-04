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




export function Serialize (dto : any) {
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
        console.log(data , "data")
        // console.log('I am running before the response is sent out', data);
        // return data;
      return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}