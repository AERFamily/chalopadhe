import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { status } from '../home/home.component';
import { SessionClass } from '../Classes/model';
import { localSessionStorage } from '../data-services/localSession';

@Component({
  selector: 'app-subjectpage',
  templateUrl: './subjectpage.component.html',
  styleUrls: ['./subjectpage.component.css'],
})
export class SubjectpageComponent implements OnInit {
  parameter:any;
  sessionVal:SessionClass;
  constructor(private router: Router, private _httpservice: HttpServiceService,private localSession:localSessionStorage) {
    // const navigation = this.router.getCurrentNavigation();
    // this.parameter = navigation.extras.state as {
    //   country: string,
    //   language: string,
    //   board: string,
    //   standard: string
    // };
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
    this.sessionVal = this.localSession.retrieveSession();
    if(this.sessionVal == null)
    {
    console.log(this.sessionVal);
      this.router.navigate(['./home']);
    }
    else
    {
      console.log(this.sessionVal);
      this._httpservice.GetSubjects(this.sessionVal.country, this.sessionVal.language, this.sessionVal.board, this.sessionVal.standard).subscribe((data: any) => {
       this.subjectData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
      }
      
  }
  openSubject(subject:string) {
    this.sessionVal.subject = subject;
    this.localSession.storeSession(this.sessionVal);
    this.router.navigate(['./classroom/chapter']);
  }
  openAddModal()
  {
    this.openModal = true;
    this.modelTitle = "Add Subject";
  }
  addSubject(val:string)
  {
    this.closeDetails()
    this._httpservice.AddSubjects(val).subscribe((data: any) => {

      alert((data as status).message);
      this.subjectData.push(val);
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  closeDetails() {
    this.openModal = false;
  }
}
