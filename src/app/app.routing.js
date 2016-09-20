"use strict";
var router_1 = require('@angular/router');
var travellers_form_component_1 = require('./quote/travellers/travellers-form.component');
var coverage_form_component_1 = require('./quote/coverage/coverage-form.component');
var summary_form_component_1 = require('./quote/summary/summary-form.component');
var routes = [
    { path: 'Products/Individual-and-Family/Travel/Quote', component: travellers_form_component_1.TravellersFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/NoQuote', component: travellers_form_component_1.TravellersFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Travellers', component: travellers_form_component_1.TravellersFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Travellers/:quoteId', component: travellers_form_component_1.TravellersFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Coverage', component: coverage_form_component_1.CoverageFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Coverage/:quoteId', component: coverage_form_component_1.CoverageFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Summary', component: summary_form_component_1.SummaryFormComponent },
    { path: 'Products/Individual-and-Family/Travel/Quote/Summary/:quoteId', component: summary_form_component_1.SummaryFormComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map