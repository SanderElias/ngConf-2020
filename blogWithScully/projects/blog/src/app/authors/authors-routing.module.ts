import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthorsComponent} from './authors.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
    children: [
      {
        path: ':id',
        loadChildren: () =>
          import('../author/author.module').then(m => m.AuthorModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
