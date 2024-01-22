import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangeComponent } from './MyComp/range/range.component';
import { SkillsComponent } from './MyComp/skills/skills.component';
import { WordCloudComponent } from './MyComp/word-cloud/word-cloud.component';
import { MylinksComponent } from './MyComp/mylinks/mylinks.component';

const routes: Routes = [
  { path: 'home', component: RangeComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'skills', component: SkillsComponent},
  { path: 'wordcloud', component: WordCloudComponent},
  { path: 'links', component: MylinksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
