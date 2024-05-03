import {
  KeycloakEvent,
  KeycloakEventType,
  KeycloakService,
} from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export const initializeKeycloak = (keycloak: KeycloakService) => () =>
  keycloak.init({
    config: {
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    initOptions: {
      useNonce: true,
      scope: 'openid',
      redirectUri: window.location.href,
      onLoad: 'login-required',
      checkLoginIframe: false,
    },
    shouldAddToken: request =>
      !environment.keycloak.acceptablePaths.some(path =>
        request.url.includes(path)
      ),
  });

export const keycloakEvents = (keycloak: KeycloakService) => () => {
  keycloak.keycloakEvents$.subscribe((event: KeycloakEvent) => {
    if (event.type === KeycloakEventType.OnAuthSuccess) {
      localStorage.clear();
    }
  });
};
