import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, pluck, switchMap} from 'rxjs/operators';
import {Authors} from '../authors/Authors.interface';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [],
})
export class AuthorComponent implements OnInit {
  author$ = this.route.params.pipe(
    pluck('id'),
    filter(Boolean),
    map(r => +r),
    switchMap(id => this.http.get<Authors>(`http://localhost:8200/users/${id}`))
  );

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {}
}
