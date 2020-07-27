import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpServiceService } from '../data-services/http-services';
const emailpattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
@Component({
  selector: 'app-commingsoon',
  templateUrl: './commingsoon.component.html',
  styleUrls: ['./commingsoon.component.css']
})
export class CommingsoonComponent implements OnInit {

  constructor(private appComp: AppComponent, private _httpservice: HttpServiceService) { }

  ngOnInit(): void {
  }
  openloginmodel()
  {
    this.appComp.openloginmodel();
  }
  suscribeEmail(email:string)
  {
    if (!emailpattern.test(email)) {
      //this.errorVal = true;
      alert("Invalid email id");
    }
    else {
      this._httpservice.SuscribeEmail(email)
        .subscribe
        (
          data => {
            alert("Email subscribed successfully");
          }
        )
    }
  }
}
