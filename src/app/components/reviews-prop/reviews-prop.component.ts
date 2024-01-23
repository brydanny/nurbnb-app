import { ReviewService } from './../../services/review.service';
import { DatePipe } from '@angular/common';
import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-prop',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reviews-prop.component.html',
  styleUrl: './reviews-prop.component.css'
})
export class ReviewsPropComponent  implements OnInit {
  @Input() propertyId: string = '';

  reviews: any[] = [];
  loading: boolean;
  error: boolean;
  msgError: string;

  constructor(
    private reviewService: ReviewService
  ) {
    this.loading = true;
    this.error = false;
    this.msgError = '';
  }

  ngOnInit(): void {
    console.log('ReviewsPropComponent'+ this.propertyId);
    this.getReviewsByPropertyId(this.propertyId);
  }

  getReviewsByPropertyId(id: string) {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    if (this.propertyId) {
      this.reviewService.getReviewsByPropertyId(id).subscribe((data: any) => {
        console.log(data);
        console.log(data[0].comentario);
        this.reviews = data;
        this.loading = false;
        console.log(this.reviews[0].comentario);
      }, (error: any) => {
        this.error = true;
        console.log(error.message);
        this.msgError = error.message;
        this.loading = false;
      });
    }

  }

}
