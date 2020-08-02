import { Component, OnInit, HostListener } from '@angular/core';
import { SessionClass, ContentClass } from '../Classes/model';
import { localSessionStorage } from '../data-services/localSession';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { status } from '../home/home.component';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  constructor(private localSession:localSessionStorage,private router: Router,private _httpservice: HttpServiceService) {}
  public openModal: boolean = false;
  modelTitle: string = '';
  contentType: string ='';
  sessionVal:SessionClass;
  contentData:ContentClass[];
  videoUrl:string;
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
      this.router.navigate(['./home']);
    }
    else
    {
      this._httpservice.GetContent(this.sessionVal.country, this.sessionVal.language, this.sessionVal.board, this.sessionVal.standard,this.sessionVal.subject,this.sessionVal.chapter).subscribe((data: any) => {
       this.contentData = data;
       this.contentData.forEach(element => {
         this.getId(element.url);
       });
       if(this.contentData && this.contentData.length>=1)
       this.videoUrl = this.contentData[0].url;
      },
        error => {
          console.log("Error in recieving data");
        });
      }
  }
  addVideo() {
    this.modelTitle = 'Add Video';
    this.openModal = true;
    this.contentType = "Video";
  }
  addBook() {
    this.modelTitle = 'Add Book';
    this.openModal = true;
    this.contentType = ""
  }
  closeDetails() {
    this.openModal = false;
  }
  addContent(url:string,title:string,description:string)
  {
    this.closeDetails();
    this._httpservice.addContent(this.sessionVal.country,this.sessionVal.language,this.sessionVal.board,this.sessionVal.standard,this.sessionVal.subject, this.sessionVal.chapter,url,title,description,this.contentType).subscribe((data: any) => {

      alert((data as status).message);
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  getId(url) {
    const regExp = /^.(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
changeVideo(url:string)
{
  this.videoUrl = url;
}
}
