//Angular
import {
  BehaviorSubject,
  Observable,
  finalize,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { VeiculosService } from 'src/app/modules/veiculos/services/veiculos.service';

@Component({
  standalone: false,
  templateUrl: './listagem-veiculos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemVeiculosComponent implements OnInit {
  public form: FormGroup;
  public veiculos$: Observable<Veiculo[]>;
  public readonly refresh$ = new BehaviorSubject<void>(null);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  get controlPlaca(): FormControl {
    return this.form.get('placa') as FormControl;
  }

  get controlModelo(): FormControl {
    return this.form.get('modelo') as FormControl;
  }

  get controlMarca(): FormControl {
    return this.form.get('marca') as FormControl;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly veiculosService: VeiculosService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  public onSubmit(form: FormGroup<any>) {
    if (form.invalid) {
      return;
    }
    const value = form.value;
    this.loading$.next(true);
    this.veiculos$ = this.veiculosService.findVeiculosByFilters(value).pipe(
      take(1),
      finalize(() => this.loading$.next(false))
    );
  }

  public onLimpar() {
    this.form.reset();
    this.loadData();
  }

  private initForm() {
    this.form = this.fb.group({
      placa: [null, [Validators.maxLength(7)]],
      modelo: [null],
      marca: [null],
    });
  }

  private loadData() {
    this.loading$.next(true);
    this.veiculos$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() =>
        this.veiculosService.all().pipe(
          take(1),
          finalize(() => this.loading$.next(false))
        )
      )
    );
  }
}
