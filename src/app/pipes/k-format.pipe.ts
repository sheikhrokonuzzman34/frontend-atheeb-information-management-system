import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kFormat',
  standalone: true
})
export class KFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'k';
    }
    return value.toString();  
  }

}
