import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';
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
selectedClass:string
  public openModal: boolean = false;
  modelTitle: string = '';
  enableSubmitButton:boolean=false;
  constructor(private router: Router,private _httpservice:HttpServiceService) { }
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
          this._httpservice.GetLanguage(val).subscribe((data: any) => {
            this.languageData = data;
          },
            error => {
              console.log("Error in recieving data");
            });
          break;
        }
    }
  }
  onLanguageChange(val: string) {
    this.selectedLanguage = val;
    if(val=="0")
    {
      this.selectedCatogory = 2;
      this.modelTitle = "Add Language";
      this.openModal = true;

    }
    else if (val !== "-1" && this.selectedCountry != "-1") {
      this._httpservice.GetBoard(this.selectedCountry,this.selectedLanguage).subscribe((data: any) => {
        this.boardData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
  onboardChange(val: string) {
    this.selectedBoard = val;
    if(val=="0")
    {
      this.selectedCatogory = 3;
      this.modelTitle = "Add Board";
      this.openModal = true;
    }
    else if (val !== "-1" && this.selectedCountry != "-1" && this.selectedLanguage !="-1") {
      this._httpservice.Getstandard(this.selectedCountry, this.selectedLanguage,this.selectedBoard).subscribe((data: any) => {

        this.classData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
  onstandardChange(val: string) {
    this.selectedClass = val;
    if(val=="0")
    {
      this.selectedCatogory = 4;
      this.modelTitle = "Add Standard";
      this.openModal = true;
    }
    else if (val !== "-1" && this.selectedCountry != "-1" && this.selectedLanguage != "-1" && this.selectedBoard != "-1") {
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
