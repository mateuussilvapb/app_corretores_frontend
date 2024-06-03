//Angular
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map, startWith, switchMap, take } from 'rxjs';

//Internos
import { Corretor } from 'src/app/shared/model/corretor';
import { CorretoresService } from 'src/app/modules/corretores/services/corretores.service';

@Component({
  standalone: false,
  templateUrl: './listagem-corretores.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemCorretoresComponent implements OnInit {
  public form: FormGroup;
  public corretores$ = new Observable<Corretor[]>();
  public readonly refresh$ = new BehaviorSubject<void>(null);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  get controlCorretor(): FormControl {
    return this.form.get('idCorretor') as FormControl;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly corretoresService: CorretoresService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  public onSubmit(form: FormGroup<any>) {
    if (form.invalid) {
      return;
    }
    this.loading$.next(true);
    const idCorretor = form.get('idCorretor').value;
    this.corretores$ = this.corretoresService.byID(idCorretor).pipe(
      take(1),
      finalize(() => this.loading$.next(false)),
      map((corretor) => [corretor])
    );
  }

  public onLimpar() {
    this.form.reset();
    this.loadData();
  }

  private loadData(): void {
    this.loading$.next(true);
    this.corretores$ =
      this.refresh$.pipe(
        startWith(undefined),
        switchMap(() =>
          this.corretoresService.all().pipe(
            take(1),
            finalize(() => this.loading$.next(false))
          ))
      )
  }

  private initForm(): void {
    this.form = this.fb.group({
      idCorretor: [null, [Validators.required]],
    });
  }
}
