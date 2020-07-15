import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  constructor() {}
  public openModal: boolean = false;
  modelTitle: string = '';
  public modalWidth: number = window.innerWidth / 2;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.openModal) {
      this.modalWidth =
        window.innerWidth * 0.6 > 500 ? window.innerWidth * 0.6 : 400;
    }
  }
  ngOnInit(): void {}
  addVideo() {
    this.modelTitle = 'Add Video';
    this.openModal = true;
  }
  addBook() {
    this.modelTitle = 'Add Book';
    this.openModal = true;
  }
  closeDetails() {
    this.openModal = false;
  }
}
