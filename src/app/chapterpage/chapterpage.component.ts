import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapterpage',
  templateUrl: './chapterpage.component.html',
  styleUrls: ['./chapterpage.component.css'],
})
export class ChapterpageComponent implements OnInit {
  constructor(private router: Router) {}
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
  openChapter() {
    this.router.navigate(['./classroom/content']);
  }
  addChapter() {
    this.openModal = true;
    this.modelTitle = 'Add Chapter';
  }
  closeDetails() {
    this.openModal = false;
  }
}
