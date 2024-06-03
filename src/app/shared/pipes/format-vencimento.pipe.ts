//Angular
import { Pipe, PipeTransform } from '@angular/core';

//Internos
import { Vencimento } from 'src/app/shared/model/vencimento';

@Pipe({
  name: 'formatVencimento',
})
export class FormatVencimentoPipe implements PipeTransform {
  transform(vencimento: Vencimento): string {
    const dia = vencimento.dia.toString().padStart(2, '0');
    const mes = vencimento.mes.toString().padStart(2, '0');
    return `${dia}/${mes}`;
  }
}
