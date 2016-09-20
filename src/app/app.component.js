"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var shared_1 = require('./shared');
var navigation_config_1 = require('./shared/navigation.config');
require('../style/app.scss');
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(api, router, activatedRoute, navigationConfig) {
        this.api = api;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.navigationConfig = navigationConfig;
        this.url = 'https://github.com/preboot/angular2-webpack';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (eventData) {
            if (eventData instanceof router_1.RoutesRecognized) {
                console.log("Current route pathFromRoot: " + eventData.state.root.children[0]);
                var routeSnaphot = eventData.state.root.children[0];
                console.log("routeSnaphot Path:" + routeSnaphot.routeConfig.path);
                console.log("routeSnaphot Params:" + routeSnaphot.params['quoteId']);
                if (routeSnaphot != null) {
                    _this.navItems = _this.navigationConfig.navigationMap[routeSnaphot.routeConfig.path];
                    _this.params = routeSnaphot.params;
                    _this.queryParams = routeSnaphot.queryParams;
                    console.log("navItems:" + _this.navItems);
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [shared_1.ApiService, navigation_config_1.NavigationConfig],
            directives: router_1.ROUTER_DIRECTIVES.slice(),
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }), 
        __metadata('design:paramtypes', [shared_1.ApiService, router_1.Router, router_1.ActivatedRoute, navigation_config_1.NavigationConfig])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map