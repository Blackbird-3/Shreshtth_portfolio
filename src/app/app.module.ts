import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsComponent } from './MyComp/skills/skills.component';
import { WordCloudComponent } from './MyComp/word-cloud/word-cloud.component';
import { MylinksComponent } from './MyComp/mylinks/mylinks.component';
import { RangeComponent } from './MyComp/range/range.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    WordCloudComponent,
    MylinksComponent,
    RangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
