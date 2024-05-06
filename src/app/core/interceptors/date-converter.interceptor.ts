import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { getAdjustedDateIfPossible } from 'src/app/utils/extras/date.utils';

@Injectable()
export class DateConverterInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone()).pipe(map(this.mapEvent));
  }

  private mapEvent = (event: any) => {
    if (event instanceof HttpResponse) {
      if (event.body instanceof Blob) {
        return event;
      } else {
        return this.convertDates(event);
      }
    } else {
      return event;
    }
  };

  private convertDates = (response: HttpResponse<any>): HttpResponse<any> => {
    const body = JSON.parse(JSON.stringify(response.body));
    const clonedResponse = response.clone({ body });
    this.traverse(clonedResponse.body);
    return new HttpResponse({
      body: clonedResponse.body,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    });
  };

  private traverse = (obj: any): void => {
    if (typeof obj === 'string') {
      return;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'string') {
          obj[key] = getAdjustedDateIfPossible(obj[key]);
        } else if (typeof obj[key] === 'object') {
          this.traverse(obj[key]);
        }
      }
    }
  };
}
