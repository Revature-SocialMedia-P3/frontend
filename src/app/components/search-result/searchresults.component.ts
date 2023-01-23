import { Component, OnInit } from '@angular/core';
import { User } from 'stream-chat';


@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchResultsComponent implements OnInit {

  validUserProfile = false;
  
  
  onSelect() {
    this.validUserProfile = true;

  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
