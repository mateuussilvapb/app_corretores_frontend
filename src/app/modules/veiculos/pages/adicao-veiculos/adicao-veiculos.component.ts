//Angular
import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  NavigationCancel,
} from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Externos
import { MessageService } from 'primeng/api';

//Internos
import { VeiculosService } from 'src/app/modules/veiculos/services/veiculos.service';

@Component({
  standalone: false,
  templateUrl: './adicao-veiculos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdicaoVeiculosComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataMaximaAnoModelo: Date;
  public dataMaximaVencimentos: Date;
  public dataAtual: Date = new Date();
  public readonly loadingAdicionar$ = new BehaviorSubject<boolean>(false);

  private navigationInProgress = false;
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
    private readonly messageService: MessageService,
    private readonly veiculosService: VeiculosService
  ) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navigationInProgress = true;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.navigationInProgress = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadConfigDatas();
    this.initForm();
  }

  public onSubmit(form: FormGroup<any>) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    form.enable();
    this.loadingAdicionar$.next(true);
    let requestFormat = this.tratarDadosRequest(
      JSON.parse(JSON.stringify(form.value))
    );
    this.veiculosService.create(requestFormat).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Veículo adicionado com sucesso!',
          life: 5000,
        });
        this.router.navigate(['/veiculos']);
      },
    });
  }

  public onVoltar() {
    const initialUrl = this.router.url;
    this.location.back();
    setTimeout(() => {
      if (this.router.url === initialUrl && !this.navigationInProgress) {
        this.router.navigate(['/veiculos']);
      }
    }, 100);
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

  private initForm(): void {
    this.form = this.fb.group({
      placa: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      modelo: ['', [Validators.required, Validators.minLength(3)]],
      marca: ['', [Validators.required, Validators.minLength(3)]],
      vencimentoDocumento: ['', [Validators.required]],
      vencimentoSeguro: [''],
      anoFabricacao: ['', [Validators.required]],
      anoModelo: [
        '',
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
