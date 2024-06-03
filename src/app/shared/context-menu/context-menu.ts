//Externos
import { Menu } from "primeng/menu";
import { MenuItem } from "primeng/api";
import { KeycloakService } from 'keycloak-angular';

//Internos
import { ROLES } from "src/app/shared/model/roles";
import { isEmpty } from "src/app/utils/extras/object.utils";
import { environment } from "src/environments/environment";

export interface MenuItensWithPermissions extends MenuItem {
  id: string;
  rolesAllowed?: ROLES[]
}

export abstract class ContextMenu<T> {
  protected readonly baseHref: string;

  constructor(
    protected readonly actionMenu: Menu,
    protected readonly keycloakService: KeycloakService
  ) {
    this.baseHref = environment.baseHref;
  }

  toggle = (event: MouseEvent, data: T) => {
    const menuItems = this.menuItems(data);
    this.actionMenu.model = this.filter(menuItems, data);
    this.actionMenu.toggle(event);
  }

  protected abstract menuItems: (data: T) => MenuItensWithPermissions[];

  protected filter(items: MenuItensWithPermissions[], data?: T): MenuItem[] {
    if (isEmpty(items)) {
      return [];
    }
    const roles = this.keycloakService.getUserRoles();
    if (isEmpty(roles)) {
      return [];
    }

    if (roles.includes(ROLES.ADMIN)) {
      return items;
    }

    return items.filter(
      item => !isEmpty(item.rolesAllowed) &&
        item.rolesAllowed.some(rolesAllowed => roles.includes(rolesAllowed))
    )
  }
}
