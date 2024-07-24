//Angular
import {
  BehaviorSubject,
  finalize,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Externos
import { MessageService } from 'primeng/api';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { VeiculosService } from '/src/app/modules/veiculos/services/veiculos.service';

@Component({
  standalone: false,
  selector: 'app-edicao-veiculos',
  templateUrl: './edicao-veiculos.component.html',
})
export class EdicaoVeiculosComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public idVeiculo!: string;
  public dataMaximaAnoModelo: Date;
  public dataMaximaVencimentos: Date;
  public dataAtual: Date = new Date();
  public dataSource$: Observable<Veiculo>;
  public readonly loadingEditar$ = new BehaviorSubject<boolean>(false);

  private readonly destroy$ = new Subject<void>();

  public get controlPlaca() {
    return this.form.get('placa');
  }

  public get controlModelo() {
    return this.form.get('modelo');
  }

  public get controlMarca() {
    return this.form.get('marca');
  }

  public get controlVencimentoDocumento() {
    return this.form.get('vencimentoDocumento');
  }

  public get controlVencimentoSeguro() {
    return this.form.get('vencimentoSeguro');
  }

  public get controlAnoFabricacao() {
    return this.form.get('anoFabricacao');
  }

  public get controlAnoModelo() {
    return this.form.get('anoModelo');
  }

  public get controlUfDocumento() {
    return this.form.get('ufDocumento');
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly veiculosService: VeiculosService
  ) {}

  ngOnInit(): void {
    this.loadConfigDatas();
    this.loadData();
    this.initForm();
  }

  public onSubmit(form: FormGroup<any>) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    form.enable();
    this.loadingEditar$.next(true);
    let requestFormat = this.tratarDadosRequest(
      JSON.parse(JSON.stringify(form.value))
    );
    this.veiculosService.update(this.idVeiculo, requestFormat).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Veículo editado com sucesso!',
          life: 5000,
        });
        this.router.navigate(['/veiculos']);
      },
    });
  }

  public onVoltar() {
    try {
      this.location.back();
    } catch (error) {
      this.router.navigate(['/veiculos']);
    }
  }

  private loadConfigDatas() {
    const data = new Date();
    this.dataMaximaVencimentos = new Date(
      data.getFullYear() + 1,
      data.getMonth() + 6,
      data.getDate()
    );
    this.dataMaximaAnoModelo = new Date(
      data.getFullYear() + 1,
      data.getMonth(),
      data.getDate()
    );
  }

  private loadData() {
    this.loadingEditar$.next(true);
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.idVeiculo = params['id'];
        if (this.idVeiculo) {
          this.dataSource$ = this.veiculosService.byID(this.idVeiculo).pipe(
            takeUntil(this.destroy$),
            tap(veiculo => {
              this.loadDataOnForm(veiculo);
            }),
            finalize(() => this.loadingEditar$.next(false))
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Veículo não encontrado!',
            life: 5000,
          });
          this.router.navigate(['/veiculos']);
        }
      });
  }

  private loadDataOnForm(veiculo: Veiculo) {
    const dataAtual = new Date();
    const dataVencimentoSeguro = new Date(
      dataAtual.getFullYear(),
      veiculo.vencimentoSeguro.mes - 1,
      veiculo.vencimentoSeguro.dia
    );
    const dataVencimentoDocumento = new Date(
      dataAtual.getFullYear(),
      veiculo.vencimentoDocumento.mes - 1,
      veiculo.vencimentoDocumento.dia
    );
    const anoFabricacao = new Date(
      Number.parseInt(veiculo.anoFabricacao),
      dataAtual.getMonth(),
      dataAtual.getDate()
    );
    const anoModelo = new Date(
      Number.parseInt(veiculo.anoModelo),
      dataAtual.getMonth(),
      dataAtual.getDate()
    );
    this.form.patchValue({
      placa: veiculo.placa,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      vencimentoDocumento: dataVencimentoDocumento,
      vencimentoSeguro: dataVencimentoSeguro,
      anoFabricacao: anoFabricacao,
      anoModelo: anoModelo,
      ufDocumento: veiculo.ufDocumento,
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      placa: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      modelo: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      marca: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      vencimentoDocumento: ['', [Validators.required]],
      vencimentoSeguro: [''],
      anoFabricacao: [{ value: '', disabled: true }, [Validators.required]],
      anoModelo: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
      ufDocumento: [
        '',
        [Validators.required, Validators.maxLength(2), Validators.minLength(2)],
      ],
    });
  }

  private tratarDadosRequest(obj: any) {
    let vencimentoDocumento = obj.vencimentoDocumento;
    let vencimentoSeguro = obj.vencimentoSeguro;
    let partesDataDocumento = vencimentoDocumento.split('/');
    let partesDataSeguro = vencimentoSeguro.split('/');

    obj.vencimentoDocumento = {
      dia: parseInt(partesDataDocumento[0]),
      mes: parseInt(partesDataDocumento[1]),
    };

    obj.vencimentoSeguro = {
      dia: parseInt(partesDataSeguro[0]),
      mes: parseInt(partesDataSeguro[1]),
    };

    return obj;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
