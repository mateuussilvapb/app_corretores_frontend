//Angular
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

//Externos
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

//Internos
import {
  initializeKeycloak,
  keycloakEvents,
} from './config/init/keycloak-init.factory';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Angular
    BrowserModule,

    //Externos
    KeycloakAngularModule,

    //Internos
    AppRoutingModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
