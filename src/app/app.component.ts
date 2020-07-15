import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { UserDataClass } from './Classes/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chalopadhe';
  isLoginModalOpen: boolean = false;
  userInformation: UserDataClass;
  constructor(private authService: SocialAuthService) {}
  openloginmodel() {
    this.isLoginModalOpen = true;
  }
  login(userid: string, pwd: string) {
    if (userid === '') {
      alert('Please enter user id');
    } else if (pwd === '') {
      alert('Please enter password');
    } else {
      // var userLoginData = new HttpParams();
      // userLoginData = userLoginData.append("user_id", userid);
      // userLoginData = userLoginData.append("password", pwd);
      // this.httpservice.loginUser(userLoginData).subscribe(data => {
      //   if (Object.keys(data).length > 1) {
      //     this.userInformation = data;
      //     this.userInformation.picture = "https://api.dishakiran.com/" + this.userInformation.picture;
      //     this.localStor.storeInformation(this.userInformation);
      //     // this.userImage = "https://api.dishakiran.com/"+this.userInformation.picture;
      //     this.isLoginModalOpen = false;
      //     this.navigateToTest();
      //   }
      //   else {
      //     alert("invalid username or password");
      //   }
      // });
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
