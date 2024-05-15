//Angular
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

//Externos
import { MessageService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { ROLES } from 'src/app/shared/model/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private readonly messageService: MessageService
  ) {
    super(router, keycloak);
  }

  override async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      this.authenticated = await this.keycloak.isLoggedIn();
      this.roles = this.getUserRoles();
      const access = await this.isAccessAllowed(route, state);
      if (!access) {
        this.messageService.add({
          severity: 'error',
          summary: 'Acesso negado',
          detail: 'Você não tem permissão para acessar essa página',
          life: 5000,
        });
      }
      return access;
    } catch (error) {
      throw new Error(
        'An error happened during access validation. Details: ' + error.message
      );
    }
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const roles = route.data['roles'];

    if (!Array.isArray(roles) || roles.length === 0) {
      return true;
    }

    return [...roles, ROLES.ADMIN].some(role => this.roles.includes(role));
  }

  private getUserRoles(realmRoles = true): string[] {
    if (!this.authenticated) {
      return [];
    }

    let roles: string[] = [];
    const keycloak = this.keycloak.getKeycloakInstance();

    if (keycloak.resourceAccess) {
      Object.keys(keycloak.resourceAccess).forEach(key => {
        if (key !== keycloak.clientId) {
          return;
        }

        const resourceAccess = keycloak.resourceAccess[key];
        const clientRoles = resourceAccess['roles'] || [];
        roles = roles.concat(clientRoles);
      });
    }

    if (realmRoles && keycloak.realmAccess) {
      const realmRoles = keycloak.realmAccess['roles'] || [];
      roles.push(...realmRoles);
    }

    return roles;
  }
}
