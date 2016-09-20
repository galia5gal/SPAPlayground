"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var shared_1 = require('./shared');
var shared_2 = require('./shared');
var shared_3 = require('./shared');
var app_routing_1 = require('./app.routing');
var travellers_form_component_1 = require('./quote/travellers/travellers-form.component');
var coverage_form_component_1 = require('./quote/coverage/coverage-form.component');
var summary_form_component_1 = require('./quote/summary/summary-form.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                travellers_form_component_1.TravellersFormComponent,
                coverage_form_component_1.CoverageFormComponent,
                summary_form_component_1.SummaryFormComponent
            ],
            providers: [
                shared_1.ApiService,
                shared_2.SessionService,
                shared_3.LabelsErrorsService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map