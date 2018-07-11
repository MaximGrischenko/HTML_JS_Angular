import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contacts} from '../models/class.contacts';

@Injectable()
export class HttpService{

  private GetDataEndPoint = "https://formula-test-api.herokuapp.com/menu";
  private PostDataEndPoint = "https://formula-test-api.herokuapp.com/contact";

  constructor(private http: HttpClient){ }

  GetRequest() {
    return this.http.get(this.GetDataEndPoint);
  }

  PostRequest(contact: Contacts){
    const body = {name: contact.name, email: contact.email, comment: contact.comment};
    return this.http.post(this.PostDataEndPoint, body);
  }
}
