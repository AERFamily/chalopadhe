import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { status } from '../home/home.component';
import { SessionClass, chpaterClass } from '../Classes/model';
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
  chapterData:chpaterClass[];
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
        this.chapterData = [];
        data.forEach(element => {
          let valArray = element.toString().split(',',2)
          let chapter = new  chpaterClass();
          console.log(valArray,chapter);
          chapter.chapterName = valArray[0];
          chapter.chapterNo = valArray[1];
          this.chapterData.push(chapter);
        });
        console.log(JSON.stringify(this.chapterData));
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
  openChapter(chapter:chpaterClass) {
    this.sessionVal.chapter = chapter.chapterName;
     this.sessionVal.chapterNo = chapter.chapterNo;
    this.localSession.storeSession(this.sessionVal);
    console.log(this.sessionVal.chapter);
    this.router.navigate(['./classroom/content']);
  }
  addChapter(val:string,chapterNo:string) {
    this.closeDetails();
    this._httpservice.AddChapter(val,chapterNo).subscribe((data: any) => {

      alert((data as status).message);
      let chapter = new chpaterClass();
      chapter.chapterName = val;
      chapter.chapterNo = chapterNo;
      this.chapterData.push(chapter);
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
