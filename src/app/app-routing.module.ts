import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { SubjectpageComponent } from './subjectpage/subjectpage.component';
import { ChapterpageComponent } from './chapterpage/chapterpage.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { CommingsoonComponent } from './commingsoon/commingsoon.component';


const routes: Routes = [
  { path: '', redirectTo: '/comingsoon', pathMatch: 'full' },
  { path: 'comingsoon', component: CommingsoonComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'classroom',
    component: ClassroomComponent,
    children: [
      { path: 'subject', component: SubjectpageComponent },
      { path: 'chapter', component: ChapterpageComponent },
      { path: 'content', component: ContentPageComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
