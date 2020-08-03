import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { UserDataClass } from './Classes/model';
import { HttpServiceService } from './data-services/http-services';
import { Router } from '@angular/router';
  export class loginStatus {
  status:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chalopadhe';
  isLoginModalOpen: boolean = false;
  userInformation: UserDataClass;
  loginStatus:loginStatus=null;
  isLogedin:boolean = false
  constructor(private authService: SocialAuthService, private _httpservice: HttpServiceService, private router: Router) {}
  openloginmodel() {
   // window.location.href ="https://admin.chalopadhe.com/admin/";
    this.isLoginModalOpen = true;
  }
  login(userid: string, pwd: string) {
    // this.isLoginModalOpen = false;
    // this.router.navigate(['./home']);
    if (userid === '') {
      alert('Please enter user id');
    } else if (pwd === '') {
      alert('Please enter password');
    } else {
      this._httpservice.login(userid,pwd).subscribe(data => {
        this.loginStatus = data as loginStatus;
        // alert(this.loginStatus.status);
        if (this.loginStatus.status == true) {
          this.isLoginModalOpen = false;
          this.isLogedin = true;
          this.router.navigate(['./home']);
        }
        else {
          alert("invalid username or password");
        }
      });
    }
  }
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) => {
        // alert(JSON.stringify(response));
        this.userInformation = new UserDataClass();
        this.userInformation.name = response.name;
        this.userInformation.email_id = response.email;
        this.userInformation.picture = response.photoUrl;
        //this.localStor.storeInformation(this.userInformation);
        this.isLoginModalOpen = false;
        // this.GetUser();
      })
      .catch((error) => {
        alert('error');
      });
  }
  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((response) => {
        //alert(JSON.stringify(response));
        this.userInformation = new UserDataClass();
        this.userInformation.name = response.name;
        this.userInformation.email_id = response.email;
        this.userInformation.picture = response.photoUrl;
        //this.localStor.storeInformation(this.userInformation);
        this.isLoginModalOpen = false;
        //this.GetUser();
      })
      .catch((error) => {
        alert('error');
      });
  }
  closeLoginModal() {
    this.isLoginModalOpen = false;
  }
}
