//Angular
import {
  BehaviorSubject,
  finalize,
  forkJoin,
  Observable,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { VeiculosService } from 'src/app/modules/veiculos/services/veiculos.service';
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';
import { CorretorVeiculoGroupByVeiculoDTO } from 'src/app/shared/model/corretor-veiculo-group-by-veiculo-DTO';

interface VeiculoCorretor {
  veiculo: Veiculo;
  corretorVeiculo: CorretorVeiculoGroupByVeiculoDTO;
}

@Component({
  standalone: false,
  selector: 'app-visualizacao-veiculos',
  templateUrl: './visualizacao-veiculos.component.html',
})
export class VisualizacaoVeiculosComponent implements OnInit, OnDestroy {
  public idVeiculo!: string;
  public dataSource$: Observable<VeiculoCorretor>;
  private readonly destroy$ = new Subject<void>();
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly veiculosService: VeiculosService,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public onVoltar() {
    this.router.navigate(['/veiculos']);
  }

  private loadData() {
    this.loading$.next(true);
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.idVeiculo = params['id'];
        if (this.idVeiculo) {
          this.dataSource$ = forkJoin({
            veiculo: this.veiculosService.byID(this.idVeiculo),
            corretorVeiculo:
              this.corretoresVeiculosService.getCorretorVeiculoGroupByCorretorByVeiculoId(
                this.idVeiculo
              ),
          }).pipe(
            take(1),
            tap(({ veiculo, corretorVeiculo }) => {
              console.log(veiculo, corretorVeiculo);
            }),
            finalize(() => this.loading$.next(false))
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
