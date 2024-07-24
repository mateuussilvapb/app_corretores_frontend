//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Internos
import { ALL_ROLES } from 'src/app/shared/model/roles';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdicaoVeiculosComponent } from './pages/adicao-veiculos/adicao-veiculos.component';
import { EdicaoVeiculosComponent } from './pages/edicao-veiculos/edicao-veiculos.component';
import { ListagemVeiculosComponent } from './pages/listagem-veiculos/listagem-veiculos.component';
import { VisualizacaoVeiculosComponent } from './pages/visualizacao-veiculos/visualizacao-veiculos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListagemVeiculosComponent,
    data: {
      roles: [ALL_ROLES],
    },
  },
  {
    path: 'adicionar',
    canActivate: [AuthGuard],
    component: AdicaoVeiculosComponent,
    data: {
      roles: [ALL_ROLES],
    },
  },
  {
    path: ':id/editar',
    canActivate: [AuthGuard],
    component: EdicaoVeiculosComponent,
    data: {
      roles: [ALL_ROLES],
    },
  },
  {
    path: ':id/visualizar',
    canActivate: [AuthGuard],
    component: VisualizacaoVeiculosComponent,
    data: {
      roles: [ALL_ROLES],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosRoutingModule {}
