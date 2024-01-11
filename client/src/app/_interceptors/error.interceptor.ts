import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          const errorStatus = error.status.toString();

          switch (error.status) {
            case 400:
              const errorFromObject = error.error.errors;

              if (errorFromObject) {
                const modalStateError = [];

                for (const key in errorFromObject) {
                  if (errorFromObject[key]) {
                    modalStateError.push(errorFromObject[key]);
                  }
                }

                throw modalStateError;
              } else {
                this.toastr.error(error.error, errorStatus);
              }

              break;

            case 401:
              this.toastr.error('Unauthorized', errorStatus);

              break;

            case 404:
              this.router.navigateByUrl('/not-found');

              break;

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };

              this.router.navigateByUrl('/server-error', navigationExtras);

              break;

            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);

              break;
          }
        }

        throw error;
      })
    );
  }
}
