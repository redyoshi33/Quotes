import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  addAuthor(author){
  	return this._http.post('/new', author)
  }
  getAuthors(){
  	return this._http.get('/all')
  }
  editAuthor(id){
  	return this._http.get('/edit/'+id)
  }
  updateAuthor(id, author){
  	return this._http.put('/update/'+id, author)
  }
  addQuote(id, quote){
    return this._http.post('/newquote/'+id, quote)
  }
  removeQuote(id, quote){
    return this._http.put('/quote/delete/'+id, quote)
  }
  updateVote(id, quote, num){
    return this._http.put('/quote/vote/'+id+'/'+num, quote)
  }
}
