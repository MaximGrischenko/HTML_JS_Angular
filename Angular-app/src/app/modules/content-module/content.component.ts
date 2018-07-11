///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FilterService} from "../../services/filter.service";

import {Burger} from "../../models/class.burger";

@Component({
  selector: 'content-component',
  templateUrl: `./content.component.html`,
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  burgers: Burger[];
  response: Burger[];

  constructor(private httpService: HttpService, private filterService: FilterService) { }

  ngOnInit() {
    this.httpService.GetRequest().subscribe(
      (data: Burger[]) => {
        this.response = data
      },
      error => console.error(error),
      () => {
        console.log('done loading burgers');

        this.burgers = this.filterService.filterByExpiration(this.response);
      }
    );
  }
}
