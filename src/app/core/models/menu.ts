export interface ItemMenu {
  label: string;
  separator: boolean;
  route?: string;
  icon?: string;
  children?: ItemMenu[];
}
