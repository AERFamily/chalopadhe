import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';

@Component({
  selector: 'app-subjectpage',
  templateUrl: './subjectpage.component.html',
  styleUrls: ['./subjectpage.component.css'],
})
export class SubjectpageComponent implements OnInit {
  parameter:any;
  constructor(private router: Router, private _httpservice: HttpServiceService) {
    const navigation = this.router.getCurrentNavigation();
    this.parameter = navigation.extras.state as {
      country: string,
      language: string,
      board: string,
      standard: string
    };
  }
  public openModal: boolean = false;
  modelTitle: string = '';
  subjectData:any;
  public modalWidth: number = window.innerWidth / 2;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.openModal) {
      this.modalWidth =
        window.innerWidth * 0.6 > 500 ? window.innerWidth * 0.6 : 400;
    }
  }
  ngOnInit(): void {
      if(this.parameter != null)
      {
      this._httpservice.GetSubjects(this.parameter.country, this.parameter.language, this.parameter.board, this.parameter.standard).subscribe((data: any) => {
       this.subjectData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
      }
  }
  openSubject(subject:string) {
    this.router.navigate(['./classroom/chapter'], {
      state: {
        country: this.parameter.country,
        language: this.parameter.language,
        board: this.parameter.board,
        standard: this.parameter.standard,
        subject:subject
      }
    });
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
