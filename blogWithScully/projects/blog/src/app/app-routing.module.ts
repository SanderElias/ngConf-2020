import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }, { path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule) }, { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }, { path: '**', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
