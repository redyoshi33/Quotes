import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	author = {name: ""};
	error: any;
	id: any;
  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
    ) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	console.log(this.id)
  	this.findAuthor(this.id)
  }
  findAuthor(id){
  	let obs = this._httpservice.editAuthor(id)
  	obs.subscribe(data => {
  		this.author.name = data['author']['name']
  	})
  }
  editSubmit(id){
    if(this.author.name.length > 0){
  	let obs = this._httpservice.updateAuthor(id, this.author)
  	obs.subscribe(data => {
  		this.error = data
  		if (this.error['errors']){
  			this.error = this.error['errors']['name']['message']
  		}
  		else{
  			this._router.navigate(['/'])
  		}
  	})
    }
  }
}
