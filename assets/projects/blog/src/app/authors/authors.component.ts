import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Authors} from './Authors.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styles: [],
})
export class AuthorsComponent  {
  authors$ = this.http.get<Authors[]>('http://localhost:8200/users');

  constructor(private http: HttpClient) {}

}
