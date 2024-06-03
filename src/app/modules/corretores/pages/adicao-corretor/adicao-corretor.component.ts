//Angular
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//Externos
import { MessageService } from 'primeng/api';

//Internos
import { CepService } from 'src/app/core/services/cep.service';
import { EnderecoViaCep } from 'src/app/core/models/endereco-viacep';
import { CorretoresService } from 'src/app/modules/corretores/services/corretores.service';

@Component({
  standalone: false,
  templateUrl: './adicao-corretor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdicaoCorretorComponent implements OnInit {
  public form: FormGroup;
  public readonly loadingCep$ = new BehaviorSubject<boolean>(false);
  public readonly loadingAdicionar$ = new BehaviorSubject<boolean>(false);

  public get controlNome(): FormControl {
    return this.form.get('nome') as FormControl;
  }

  public get controlDataNascimento(): FormControl {
    return this.form.get('dataNascimento') as FormControl;
  }

  public get controlCpf(): FormControl {
    return this.form.get('cpf') as FormControl;
  }

  public get controlEndereco(): FormGroup {
    return this.form.get('endereco') as FormGroup;
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly cepService: CepService,
    private readonly messageService: MessageService,
    private readonly corretoresService: CorretoresService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      apelido: [null],
      dataNascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      endereco: this.formEndereco,
    });
  }

  public onSubmit(form: FormGroup<any>) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    form.enable();
    this.loadingAdicionar$.next(true);
    this.corretoresService
      .create(form.value)
      .pipe(
        take(1),
        finalize(() => this.loadingAdicionar$.next(false))
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Corretor adicionado com sucesso!',
            life: 5000,
          });
          this.router.navigate(['/corretores']);
        },
      });
  }

  public onCompleteCEP() {
    if (this.controlEndereco.get('cep').value === '') {
      this.handleErrorConsultaCEP();
      return;
    }
    this.loadingCep$.next(true);
    this.cepService
      .getEndereco(this.controlEndereco.get('cep').value)
      .pipe(
        take(1),
        finalize(() => this.loadingCep$.next(false))
      )
      .subscribe({
        next: response => {
          this.tratarCEP(response);
        },
      });
  }

  public onBlurCEP() {
    if (this.controlEndereco.get('cep').valid) {
      this.onCompleteCEP();
    }
  }

  public onVoltar() {
    this.location.back();
  }

  private tratarCEP(response: EnderecoViaCep) {
    if (response && !response.erro) {
      this.handleSuccessConsultaCEP(response);
    } else {
      this.handleErrorConsultaCEP();
    }
  }

  private handleSuccessConsultaCEP(response: EnderecoViaCep) {
    this.controlEndereco.enable();
    const cepControl = this.controlEndereco.get('cep');
    this.updateControlEndereco(cepControl);
    this.controlEndereco.patchValue({
      bairro: response.bairro,
      cidade: response.localidade,
      uf: response.uf,
      rua: response.logradouro,
      complemento: response.complemento,
    });
    if (response.localidade && response.localidade != '') {
      const controlCidade = this.controlEndereco.get('cidade');
      controlCidade.disable();
      this.updateControlEndereco(controlCidade);
    }
    if (response.uf && response.uf != '') {
      const controlUF = this.controlEndereco.get('uf');
      controlUF.disable();
      this.updateControlEndereco(controlUF);
    }
    if (response.bairro && response.bairro != '') {
      const controlBairro = this.controlEndereco.get('bairro');
      controlBairro.disable();
      this.updateControlEndereco(controlBairro);
    }
    if (response.logradouro && response.logradouro != '') {
      const controlRua = this.controlEndereco.get('rua');
      controlRua.disable();
      this.updateControlEndereco(controlRua);
    }
    if (response.complemento && response.complemento != '') {
      const controlComplemento = this.controlEndereco.get('complemento');
      controlComplemento.disable();
      this.updateControlEndereco(controlComplemento);
    }
  }

  private handleErrorConsultaCEP() {
    this.resetFormEndereco();
    const cepControl = this.controlEndereco.get('cep');
    cepControl.setValidators([this.cepValidator]);
    this.updateControlEndereco(cepControl);
  }

  private resetFormEndereco() {
    this.controlEndereco.reset();
    this.controlEndereco.clearValidators();
    this.controlEndereco.enable();
  }

  private updateControlEndereco(control: AbstractControl) {
    control.markAsDirty();
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  private cepValidator(): ValidationErrors | null {
    return { invalidCEP: true };
  }

  private get formEndereco(): FormGroup {
    return this.fb.group({
      cep: [null, [Validators.required, Validators.maxLength(9)]],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      uf: [null, [Validators.required, Validators.maxLength(2)]],
      rua: [null, Validators.required],
      complemento: [null],
      numero: [null, Validators.required],
      referencia: [null],
    });
  }
}
