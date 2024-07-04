//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Internos
import { ALL_ROLES } from 'src/app/shared/model/roles';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListagemVeiculosComponent } from './pages/listagem-veiculos/listagem-veiculos.component';
import { AdicaoVeiculosComponent } from './pages/adicao-veiculos/adicao-veiculos.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosRoutingModule {}
