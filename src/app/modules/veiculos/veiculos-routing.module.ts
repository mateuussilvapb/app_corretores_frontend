//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Internos
import { ALL_ROLES } from 'src/app/shared/model/roles';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListagemVeiculosComponent } from './pages/listagem-veiculos/listagem-veiculos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListagemVeiculosComponent,
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
