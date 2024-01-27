import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('exampleModal',{static:false}) exampleModal: any;

  close() {
    this.exampleModal.nativeElement.click();
  }

}
