import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
	author: any;
	error: any;
	id: any;

  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
    ) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	this.findAuthor(this.id)
  }
  findAuthor(id){
  	let obs = this._httpservice.editAuthor(id)
  	obs.subscribe(data => {
  		this.author = data['author']
  		console.log(this.author)
  	})
  }
  deleteQuote(id, quote){
  	let obs = this._httpservice.removeQuote(id, quote)
  	obs.subscribe(data => {
  		this.findAuthor(id)
  	})
  }
  changeVote(id, quote, num){
    let obs = this._httpservice.updateVote(id, quote, num)
    obs.subscribe(data => {
      this.findAuthor(id)
    })
  }
}
