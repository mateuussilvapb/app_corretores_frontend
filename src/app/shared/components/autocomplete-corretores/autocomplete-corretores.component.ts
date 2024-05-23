//Angular
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

//Externos
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
  AutoCompleteCompleteEvent,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

//Internos
import { Reference } from 'src/app/shared/model/reference';
import { LoadingComponent } from '../loading/loading.component';
import { CorretoresService } from 'src/app/modules/corretores/services/corretores.service';

@Component({
  selector: 'app-autocomplete-corretores',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    FloatLabelModule,
    AutoCompleteModule,
  ],
  template: `
    <div>
      @if(loading$ | async){
      <app-loading></app-loading>
      }
      <div [hidden]="loading$ | async">
        <p-floatLabel>
          <p-autoComplete
            delay="500"
            class="autocomplete-corretores"
            inputId="float-label"
            optionLabel="descricao"
            [forceSelection]="true"
            (onBlur)="onBlur($event)"
            [suggestions]="sugestoesCorretores"
            (onSelect)="onSelectCorretor($event)"
            (completeMethod)="onSearchCorretor($event)"
          />
          <label for="float-label">Corretor</label>
        </p-floatLabel>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep .autocomplete-corretores {
        .p-autocomplete {
          width: 100% !important;
          .p-autocomplete-input {
            width: 100% !important;
          }
        }
      }
    `,
  ],
})
export class AutocompleteCorretoresComponent implements OnInit {
  @Input() public control: FormControl;
  public sugestoesCorretores: Array<Reference<string>> = [];
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly corretoresService: CorretoresService
  ) {}

  ngOnInit(): void {
    this.loadCacheCorretoresBackend();
  }

  public onBlur(event: any) {
    if (event.srcElement.value === '') {
      this.control.setValue(null);
      this.control.markAsDirty();
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
  }

  public onSelectCorretor(event: AutoCompleteSelectEvent) {
    this.control.setValue(event.value.identificacao);
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  public onSearchCorretor(event: AutoCompleteCompleteEvent) {
    this.corretoresService
      .getCorretoresQuery(event.query.toLowerCase())
      .pipe(take(1))
      .subscribe(corretores => {
        this.sugestoesCorretores = corretores;
        this.cdRef.markForCheck();
      });
  }

  private loadCacheCorretoresBackend() {
    this.loading$.next(true);
    this.corretoresService
      .getCorretoresQuery()
      .pipe(
        take(1),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: () => {
          this.cdRef.markForCheck();
        },
      });
  }
}
