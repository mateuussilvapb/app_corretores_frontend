//Angular
import {
  Input,
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, startWith, tap } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';

//Internos
import { errorMessagesDictionary } from './errors';

@Component({
  selector: 'app-form-control-errors',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(errorMessages$ | async; as errorMessages){
    <div>
      <ul
        class="text-sm m-0 text-red-600 p-0 list-none	mt-1"
        [hidden]="!errorMessages || errorMessages.length === 0"
      >
        @for(message of errorMessages; track message){
        <li class="list-none">
          {{ message }}
        </li>
        }
      </ul>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlErrorsComponent {
  errorMessages$: Observable<string[]>;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  @Input()
  public set control(control: AbstractControl) {
    this.errorMessages$ = control.valueChanges.pipe(
      startWith(control.errors),
      filter(() => control.dirty),
      map(() => this.map(control.errors)),
      tap(() => this.cdRef.markForCheck())
    );
  }

  private map = (errors: ValidationErrors) =>
    errors
      ? Object.keys(errors).map(key => this.translate(key, errors[key]))
      : [];

  private translate = (key, value) => {
    const translationFn =
      errorMessagesDictionary[key] ||
      (() => `Campo inválido: ${key} - ${value}`);
    return translationFn(value);
  };
}
