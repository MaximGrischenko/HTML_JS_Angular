///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component} from "@angular/core";

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  visibility: boolean = true;

  toogle() {
    this.visibility = !this.visibility;
  }

  onResize(event) {
    this.visibility = event.target.innerWidth > 768 ? true : false;
  }
}
