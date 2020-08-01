import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
import { localSessionStorage } from '../data-services/localSession';
import { SessionClass } from '../Classes/model';
const pattern = /^[A-Za-z0-9 ]+$/;
export class status {
  message: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
countryData:any;
languageData:any;
boardData:any;
classData:any;
selectedCountry:string;
selectedLanguage:string;
selectedBoard:string;
selectedClass:string;
SessionContent:SessionClass;
  public openModal: boolean = false;
  modelTitle: string = '';
  enableSubmitButton:boolean=false;
  constructor(private router: Router,private _httpservice:HttpServiceService,private localSession:localSessionStorage) { }
  public modalWidth: number = window.innerWidth / 2;
  selectedCatogory:Number = -1;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.openModal) {
      this.modalWidth =
        window.innerWidth * 0.6 > 500 ? window.innerWidth * 0.6 : 400;
    }
  }
  ngOnInit(): void {
    this._httpservice.GetCountry().subscribe((data: any) => {
      this.countryData = data;
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  gotoDashboard()
  {
    this.router.navigate(['./classroom'], {
      state: {
        country: this.selectedCountry,
        language:this.selectedLanguage ,
        board: this.selectedBoard,
        standard:this.selectedClass
      }
    });
  }
  onCountryChange(val:string)
  {
    this.enableSubmitButton = false;
    switch(val)
    {
      case "0":
      {
        this.selectedCatogory = 1;
        this.modelTitle = "Add Country";
        this.openModal = true
        break;
      }
      case "-1":
        {
          break;
        }
      default:
        {
          this.selectedCountry = val;
          this.SessionContent = new SessionClass();
          this.SessionContent.country = val;
          this.localSession.storeSession(this.SessionContent);
          this.selectedLanguage = "-1";
          this.selectedBoard = "-1";
          this.selectedClass = "-1";
          this.getLanguageData(val);
          break;
        }
    }
  }
  getLanguageData(country:string)
  {
    this._httpservice.GetLanguage(country).subscribe((data: any) => {
      this.languageData = data;
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  onLanguageChange(val: string) {
    this.selectedLanguage = val;
    this.enableSubmitButton = false;
    if(val=="0")
    {
      this.selectedCatogory = 2;
      this.modelTitle = "Add Language";
      this.openModal = true;

    }
    else if (val !== "-1" && this.selectedCountry != "-1") {
          this.SessionContent.language = val;
          this.localSession.storeSession(this.SessionContent);
          this.selectedBoard = "-1";
          this.selectedClass = "-1";
      this.getBoardData();
    }
  }
  getBoardData()
  {
    this._httpservice.GetBoard(this.selectedCountry,this.selectedLanguage).subscribe((data: any) => {
      this.boardData = data;
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  onboardChange(val: string) {
    this.enableSubmitButton = false;
    this.selectedBoard = val;
    if(val=="0")
    {
      this.selectedCatogory = 3;
      this.modelTitle = "Add Board";
      this.openModal = true;
    }
    else if (val !== "-1" && this.selectedCountry != "-1" && this.selectedLanguage !="-1") {
      this.SessionContent.board = val;
          this.localSession.storeSession(this.SessionContent);
          this.selectedClass = "-1";
      this.getStandardData();
    }
  }
  getStandardData()
  {
    this._httpservice.Getstandard(this.selectedCountry, this.selectedLanguage,this.selectedBoard).subscribe((data: any) => {

      this.classData = data;
    },
      error => {
        console.log("Error in recieving data");
      });
  }
  onstandardChange(val: string) {
    this.selectedClass = val;
    this.enableSubmitButton = false;
    if(val=="0")
    {
      this.selectedCatogory = 4;
      this.modelTitle = "Add Standard";
      this.openModal = true;
    }
    else if (val !== "-1" && this.selectedCountry != "-1" && this.selectedLanguage != "-1" && this.selectedBoard != "-1") {
      this.SessionContent.standard = val;
      this.localSession.storeSession(this.SessionContent);
      this.enableSubmitButton = true;
    }
  }
  closeDetails() {
    this.openModal = false;
  }
  AddValue(val:string)
  {
    this.openModal = false;
    if (pattern.test(val))
    {
      console.log(this.selectedCatogory);
      switch (this.selectedCatogory) {
        case 1:
          {
            this._httpservice.AddCountry(val).subscribe((data: any) => {
              alert((data as status).message);
              this.countryData.push(val);
              this.selectedCountry =val;
              this.SessionContent = new SessionClass();
              this.SessionContent.country = val;
              this.localSession.storeSession(this.SessionContent);
              this.selectedLanguage = "-1";
              this.selectedBoard = "-1";
              this.getLanguageData(val)
            },
              error => {
                console.log("Error in recieving data");
              });
            break;
          }
        case 2:
          {
            this._httpservice.AddLanguage(val).subscribe((data: any) => {

              alert((data as status).message);
              this.languageData.push(val);
              this.selectedLanguage = val;
              this.SessionContent.language = val;
          this.localSession.storeSession(this.SessionContent);
          this.selectedBoard = "-1";
          this.selectedClass = "-1";
          this.getBoardData();
            },
              error => {
                console.log("Error in recieving data");
              });
            break;
          }
        case 3:
          {
            this._httpservice.AddBoard(val).subscribe((data: any) => {

              alert((data as status).message);
              this.boardData.push(val);
              this.selectedBoard = val;
              this.SessionContent.board = val;
          this.localSession.storeSession(this.SessionContent);
          this.selectedClass = "-1";
          this.getStandardData();
            },
              error => {
                console.log("Error in recieving data");
              });
            break;
          }
        case 4:
          {
            this._httpservice.Addstandard(val).subscribe((data: any) => {

              alert((data as status).message);
              this.classData.push(val);
              this.selectedClass = val;
              this.SessionContent.standard = val;
              this.localSession.storeSession(this.SessionContent);
              this.enableSubmitButton = true;
            },
              error => {
                console.log("Error in recieving data");
              });
            break;
          }
      }
    }
    else
    {
      alert("Name is not valid");
    }
  }
}
