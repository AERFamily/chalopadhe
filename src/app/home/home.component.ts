import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
countryData:any;
  constructor(private router: Router,private _httpservice:HttpServiceService) { }

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
    this.router.navigate(['./classroom']);
  }
  onCountryChange(val:string)
  {
    alert(val);
    if(val!== "-1")
    {
      this._httpservice.GetCountry().subscribe((data: any) => {
        this.countryData = data;
      },
        error => {
          console.log("Error in recieving data");
        });
    }
  }
}
