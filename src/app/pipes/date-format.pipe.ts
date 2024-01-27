import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    console.log('Pipe- DateFormatPipe');

    return moment(value).locale('es').format('ll');
  }

}
