import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toArray' })
export class ToArrayPipe implements PipeTransform {
  transform(value: any) {
    if (Array.isArray(value)) {
      return Array.from(value);
    } else {
      return [value];
    }
  }
}
