import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute, RoutesRecognized, ActivatedRouteSnapshot  } from '@angular/router';

import { ApiService } from './shared';

import { NavigationConfig } from './shared/navigation.config'
import { NavigationItem } from './shared/navigationItem'

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [ApiService, NavigationConfig],
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  url = 'https://github.com/preboot/angular2-webpack';
  routerUrl: string
  breadcrumbs: Array<Object>;
  navItems: NavigationItem [];
  params: {};
  queryParams: {};
  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private navigationConfig: NavigationConfig) {
  }

  ngOnInit() {
        
      this.router.events.subscribe(eventData=> {
          if (eventData instanceof RoutesRecognized) {
              console.log("Current route pathFromRoot: " + eventData.state.root.children[0]);
              let routeSnaphot = <ActivatedRouteSnapshot>eventData.state.root.children[0];
              console.log("routeSnaphot Path:" + routeSnaphot.routeConfig.path) ;
              
              console.log("routeSnaphot Params:" + routeSnaphot.params['quoteId']) ;
              if(routeSnaphot!=null) {
                this.navItems = this.navigationConfig.navigationMap[routeSnaphot.routeConfig.path];
                this.params = routeSnaphot.params;
                this.queryParams = routeSnaphot.queryParams;
                console.log("navItems:" + this.navItems) ;
              }
              
          }
      });

      /*
      this.router.events.subscribe(eventData => {
        if (eventData instanceof RoutesRecognized) {
          
          let event:any = eventData;
          let currentUrlPart = event.state._root;
          let currUrl = '#'; //for HashLocationStrategy
          console.log("Current route URL: " + eventData.url);
          console.log("Current route pathFromRoot: " + eventData.state.root.firstChild.component);

          this.breadcrumbs = [];
          while (currentUrlPart.children.length > 0) {
            currentUrlPart = currentUrlPart.children[0];
            let routeSnaphot = <ActivatedRouteSnapshot>currentUrlPart.value;
            console.log("routeSnaphot:" + routeSnaphot.routeConfig.path) ;
            currUrl += '/' + routeSnaphot.url.map(function (item) {
                console.log("path:" + item.path) 
                return item.path;
              }).join('/');
            console.log("currUrl:" + currUrl)  
            this.breadcrumbs.push({
              displayName: (<any>routeSnaphot.data).displayName,
              url: currUrl,
              params: routeSnaphot.params
            })
            console.log("breadcrumbs are:" + this.breadcrumbs)
          }               
        }
    });*/
        
        //this.labelsErrors.getAllLabels().subscribe(p => this.labels = p);
        //this.router.routerState.queryParams.subscribe(queryParams=> 
        //this.routername = queryParams["quoteId"]
      //);
  }
}
