import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	author: any;
	error: any;
	
  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
    ) { }

  ngOnInit() {
  	this.author = {name: ""}
  }
  addSubmit(){
  	if(this.author.name.length > 0){
  		let obs = this._httpservice.addAuthor(this.author)
  		obs.subscribe(data => {
  			console.log(data)
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
