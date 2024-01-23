import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
  standalone: true
})
export class NoimagePipe implements PipeTransform {

  transform(images: string): string {
    console.log('Pipe');
    console.log(images);
    if (!images) {
      return 'assets/img/noimage.png';
    }
    if (images.length > 0) {
      return images;
    }else{
      return 'assets/img/noimage.png';
    }
  }

}
