// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { format } from 'date-fns';

// @Injectable()
// export class ResponseDateFormatInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map(data => this.recursiveDateFormat(data))
//     );
//   }

//   recursiveDateFormat(value: any): any {
//     if (value instanceof Date) {
//       return format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS"); // return format(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"); <--- z informacja o strefie czasowej - odkomentować jeżeli chcemy to widzieć
//     } else if (Array.isArray(value)) {
//       return value.map(v => this.recursiveDateFormat(v));
//     } else if (value !== null && typeof value === 'object') {
//       Object.keys(value).forEach(key => {
//         value[key] = this.recursiveDateFormat(value[key]);
//       });
//       return value;
//     }
//     return value;
//   }
// }
