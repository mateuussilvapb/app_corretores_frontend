//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Internos
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CorretoresComponent } from './pages/corretores/corretores.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CorretoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorretoresRoutingModule {}
