import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { status } from '../home/home.component';
import { SessionClass } from '../Classes/model';
import { localSessionStorage } from '../data-services/localSession';

@Component({
  selector: 'app-chapterpage',
  templateUrl: './chapterpage.component.html',
  styleUrls: ['./chapterpage.component.css'],
})
export class ChapterpageComponent implements OnInit {
  parameter: any;
  constructor(private router: Router, private _httpservice: HttpServiceService,private localSession:localSessionStorage) {
    // const navigation = this.router.getCurrentNavigation();
    // this.parameter = navigation.extras.state as {
    //   country: string,
    //   language: string,
    //   board: string,
    //   standard: string,
    //   subject:string
    // };
  }
  chapterData:any;
  sessionVal:SessionClass;
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
    this.sessionVal = this.localSession.retrieveSession();
    if(this.sessionVal == null)
    {
    console.log(this.sessionVal);
      this.router.navigate(['./home']);
    }
    else
    {
      this._httpservice.GetChapter(this.sessionVal.country, this.sessionVal.language, this.sessionVal.board, this.sessionVal.standard,this.sessionVal.subject).subscribe((data: any) => {
        this.chapterData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
  openChapter(chapter:string) {
    this.sessionVal.chapter = chapter;
    this.localSession.storeSession(this.sessionVal);
    console.log(this.sessionVal.chapter);
    this.router.navigate(['./classroom/content']);
  }
  addChapter(val:string) {
    this.closeDetails();
    this._httpservice.AddChapter(val).subscribe((data: any) => {

      alert((data as status).message);
      this.chapterData.push(val);
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  openAddModal()
  {
    this.openModal = true;
    this.modelTitle = 'Add Chapter';
  }
  closeDetails() {
    this.openModal = false;
  }
}
