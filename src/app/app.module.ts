import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { SubjectpageComponent } from './subjectpage/subjectpage.component';
import { ChapterpageComponent } from './chapterpage/chapterpage.component';
import { ContentPageComponent } from './content-page/content-page.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { CommingsoonComponent } from './commingsoon/commingsoon.component';
@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    HomeComponent,
    SubjectpageComponent,
    ChapterpageComponent,
    ContentPageComponent,
    CommingsoonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SocialLoginModule, HttpClientModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '271374881053-4mhnja02871vm9tiqq4qjv8g0npgkrgh.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('575334146459914'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider('clientId'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
