import { ItemMenu } from 'src/app/core/models/menu';

export const ItensMenu: ItemMenu[] = [
  {
    label: 'CORRETOR',
    separator: true,
    children: [
      {
        label: 'Vales',
        separator: false,
        icon: 'pi pi-dollar',
        route: '/corretores/vales',
      },
      {
        label: 'Veículos',
        separator: false,
        icon: 'pi pi-car',
        route: '/corretores/veiculos',
      },
      {
        label: 'Corretores',
        separator: false,
        icon: 'pi pi-user',
        route: '/corretores',
      },
    ],
  },
  {
    label: 'VEÍCULOS',
    separator: true,
    children: [
      {
        label: 'Corretores',
        separator: false,
        icon: 'pi pi-user',
        route: 'veiculos/corretores',
      },
    ],
  },
  {
    label: 'VALES',
    separator: true,
    children: [
      {
        label: 'Corretores',
        separator: false,
        icon: 'pi pi-user',
        route: 'vales/corretores',
      },
    ],
  }
];
