//Angular
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Externos
import { MessageModule } from 'primeng/message';
import { MessageService, ConfirmationService } from 'primeng/api';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

//Internos
import {
  initializeKeycloak,
  keycloakEvents,
} from 'src/app/config/init/keycloak-init.factory';
import { AppComponent } from 'src/app/app.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { DateConverterInterceptor } from './core/interceptors/date-converter.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Angular
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //Externos
    MessageModule,
    KeycloakAngularModule,

    //Internos
    UtilsModule,
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakEvents,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateConverterInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
