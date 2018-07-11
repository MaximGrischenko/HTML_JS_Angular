import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule }   from '@angular/common/http';

import { contentRouting } from "./content.routing";
import { TitleComponent } from "../../components/title-component/title.component";
import { ContentComponent } from "./content.component";
import { HttpService } from "../../services/http.service";
import { FilterService } from "../../services/filter.service";

@NgModule({
  declarations: [ TitleComponent, ContentComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    contentRouting
  ],
  providers: [HttpService, FilterService]
})

export class ContentModule {}
