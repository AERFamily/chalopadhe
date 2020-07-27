import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';

@Component({
  selector: 'app-chapterpage',
  templateUrl: './chapterpage.component.html',
  styleUrls: ['./chapterpage.component.css'],
})
export class ChapterpageComponent implements OnInit {
  parameter: any;
  constructor(private router: Router, private _httpservice: HttpServiceService) {
    const navigation = this.router.getCurrentNavigation();
    this.parameter = navigation.extras.state as {
      country: string,
      language: string,
      board: string,
      standard: string,
      subject:string
    };
  }
  chapterData:any;
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
  ngOnInit(): void {
    if (this.parameter != null) {
      this._httpservice.GetChapter(this.parameter.country, this.parameter.language, this.parameter.board, this.parameter.standard,this.parameter.subject).subscribe((data: any) => {
        this.chapterData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
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
