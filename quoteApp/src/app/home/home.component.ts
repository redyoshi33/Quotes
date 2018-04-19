import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	authors: any;
  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
    ) { }

  ngOnInit() {
  	this.fetchAuthors()
  }
  fetchAuthors(){
  	let obs = this._httpservice.getAuthors()
  	obs.subscribe(data => {
  		this.authors = data['authors']
  	})
  }
}
