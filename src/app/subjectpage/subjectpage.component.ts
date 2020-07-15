import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjectpage',
  templateUrl: './subjectpage.component.html',
  styleUrls: ['./subjectpage.component.css'],
})
export class SubjectpageComponent implements OnInit {
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
  openSubject() {
    this.router.navigate(['./classroom/chapter']);
  }
  addSubject()
  {
    this.openModal = true;
    this.modelTitle = "Add Subject";
  }
  closeDetails() {
    this.openModal = false;
  }
}
