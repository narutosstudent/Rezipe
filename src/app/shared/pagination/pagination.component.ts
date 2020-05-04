import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalRecipes: number;
  @Input() recipesPerPage: number;

  pageNumbers: number[];

  @Output() paginate = new EventEmitter<number>();

  constructor() {
    this.pageNumbers = [];
   }

  ngOnInit(): void {
  for (let i = 1; i <= Math.ceil(this.totalRecipes / this.recipesPerPage); i++) {
    this.pageNumbers.push(i);
  }
}

    onPaginate(paginateNumber: number, event: any) {
      event.preventDefault();
      this.paginate.emit(paginateNumber);
    }
}
