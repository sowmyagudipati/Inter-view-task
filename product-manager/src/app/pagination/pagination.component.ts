import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  totalItems: number;
  @Input()
  itemsPerPage: number;
  @Output() pageChange = new EventEmitter<number>();
  showNext: boolean;
  totalPages: number;
  pages: number[] = [];
  activePage: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createPageArray();
  }

  ngOnInit(): void {
    this.createPageArray();
  }

  onPageChange(crPage: number) {
    this.activePage = crPage;
    this.pageChange.emit(crPage);
  }

  onNextClick() {
    if (this.activePage < this.totalPages) {
      this.activePage = this.activePage + 1;
      this.pageChange.emit(this.activePage);
    }
  }

  private createPageArray() {
    this.pages = [];
    this.activePage = 1;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.activePage = (this.activePage <= this.totalPages) ? this.activePage : 1;
    this.showNext = this.totalPages > 1
  }

}
