import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../data-services/http-services';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
parameter:any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.parameter = navigation.extras.state as {
      country: string,
      language: string,
      board: string,
      standard: string
    };
    
   }

  ngOnInit(): void {
    this.router.navigate(['./classroom/subject'], {
      state: {
        country: this.parameter.country,
        language: this.parameter.language,
        board: this.parameter.board,
        standard: this.parameter.standard
      }
    });
  }

}
