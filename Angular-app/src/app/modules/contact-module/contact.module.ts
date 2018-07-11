import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { contactRouting } from "./contact.routing";
import { ContactComponent } from "./contact.component";
import {HttpService} from "../../services/http.service";

@NgModule({
  declarations: [ ContactComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    contactRouting
    ],
  providers: [HttpService],
})

export class ContactModule {}
