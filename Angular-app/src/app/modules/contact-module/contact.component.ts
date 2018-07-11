///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component} from '@angular/core';
import {FilterService} from "../../services/filter.service";
import {HttpService} from "../../services/http.service";
import {Contacts} from "../../models/class.contacts";

@Component({
  selector: 'contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {

  contacts: Contacts = new Contacts("", "", "");
  response: Contacts;
  done: boolean = false;

  constructor(private httpService: HttpService) {
  }

  SendContacts(contacts: Contacts) {
    this.httpService.PostRequest(contacts)
      .subscribe(
        (data: Contacts) => {
          this.response = data;
          this.done = true;
          this.contacts.name = "";
          this.contacts.email = "";
          this.contacts.comment = "";
        },
        error => console.error(error)
      );
  }
}
