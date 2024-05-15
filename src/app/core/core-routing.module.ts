//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Internos
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'corretores',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/corretores/corretores.module').then(
        m => m.CorretoresModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
