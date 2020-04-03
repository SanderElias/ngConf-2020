import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ScullyRoute, ScullyRoutesService} from '@scullyio/ng-lib';
import {merge, timer} from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent {
  /** create titles and types from the blog route */
  blogs$ = this.srs.available$.pipe(
    map(routes =>
      routes
        /** extract only blog routes */
        .filter(route => route.route.startsWith('/blog/'))
        /** create title and type */
        .map(properTitle)
    ),
    shareReplay(1)
  );

  /**
   * quick hack to get the current route.
   * I don't seem to get an route event on init so I use a timer
   *  a proper solution should figure out the why.
   * The router.url is only properly updated _after_ the navigationEnd event
   */
  currentRoute$ = merge(
    timer(5),
    this.router.events.pipe(filter(ev => ev instanceof NavigationEnd))
  ).pipe(
    debounceTime(5),
    switchMap(e => this.blogs$),
    /** check for current url in routelist */
    map(list => list.find(r => this.router.url.includes(r.route)))
  );

  constructor(private router: Router, private srs: ScullyRoutesService) {}
}

/**
 * Helper function to extract tile and type from the route itself
 * In a non-demo app, Ideally,this data would be in the front-matter
 * of the markdown files
 * @param route
 */
function properTitle(route: ScullyRoute): ScullyRoute {
  const result = {
    ...route,
    blogType: 'general',
    title: route.title || route.route.toLowerCase().slice(6),
  };
  if (result.title.includes('/')) {
    const [type, ...rest] = result.title.split('/');
    result.blogType = type;
    result.title = rest.join(' ');
  }
  return result as ScullyRoute;
}
