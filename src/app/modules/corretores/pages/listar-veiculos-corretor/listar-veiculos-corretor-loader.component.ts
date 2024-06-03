//Angular
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, finalize, of, take } from 'rxjs';

//Internos
import { CorretorVeiculoByCorretorID } from 'src/app/shared/model/corretor-veiculo';
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';

@Component({
  standalone: false,
  template: `
    @if (loading$ | async) {
    <app-loading></app-loading>
    } @if (data$ | async; as data) {
    <div [hidden]="loading$ | async">
      <app-listar-veiculos-corretor
        [data]="data"
      ></app-listar-veiculos-corretor>
    </div>
    }
  `,
})
export class ListarVeiculosCorretorLoaderComponent implements OnInit {
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public data$: Observable<CorretorVeiculoByCorretorID>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {}

  ngOnInit(): void {
    this.getVeiculosCorretor();
  }

  public getVeiculosCorretor(): void {
    const idCorretor = this.activatedRoute.snapshot.params['id'];
    if (idCorretor) {
      this.loading$.next(true);
      this.data$ = this.corretoresVeiculosService
        .getVeiculosCorretor(idCorretor)
        .pipe(
          take(1),
          finalize(() => this.loading$.next(false))
        );
    } else {
      this.data$ = of(null);
    }
  }
}
