import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComp/home/home.component';
import { SkillsComponent } from './MyComp/skills/skills.component';
import { WordCloudComponent } from './MyComp/word-cloud/word-cloud.component';
import { MylinksComponent } from './MyComp/mylinks/mylinks.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'projects', component: SkillsComponent},
  { path: 'about', component: WordCloudComponent},
  { path: 'contact', component: MylinksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
