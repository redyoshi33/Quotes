import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  author: any;
  error: any;
  id: any;
  quote: any;
  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
    ) { }

  ngOnInit() {
    this.quote = {quote: ""}
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
  quoteSubmit(id){
    console.log(this.quote)
    let obs = this._httpservice.addQuote(id, this.quote)
    obs.subscribe(data => {
      console.log(data)
      this.error = data
        if (this.error['errors']){
          console.log(this.author.quotes.length)
          this.error = this.error['errors']['quotes.'+this.author.quotes.length+'.quote']['message']
        }
        else{
          this._router.navigate(['/quotes/'+id])
        }
    })
  }
}
