"use strict";
var core_1 = require('@angular/core');
var traveller_1 = require('./../../shared/traveller');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var session_service_1 = require('./../../shared/session.service');
var SummaryFormComponent = (function () {
    function SummaryFormComponent(formBuilder, activatedRoute, router, sessionService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.sessionService = sessionService;
        this.errorMessage = 'Please Contact BF&M';
        this.submitted = false;
        this.title = "Here is your travel quote";
    }
    Object.defineProperty(SummaryFormComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    SummaryFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.sessionService.get('travelQuote');
        if (this.model == null || this.model === undefined) {
            this.activatedRoute.params.subscribe(function (params) {
                _this.quoteId = params['quoteId'];
                // TO DO: Get QuoteBy ID
                if (_this.quoteId != null) {
                    _this.model = new traveller_1.TravelQuote('TRAVELANN', 'TRAVELANN’', new Date(), 5, false, false, false, false, 1, 0);
                    _this.model.quoteId = _this.quoteId;
                }
            });
        }
    };
    SummaryFormComponent = __decorate([
        core_1.Component({
            selector: 'coverage-form',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            templateUrl: './summary-form.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, session_service_1.SessionService])
    ], SummaryFormComponent);
    return SummaryFormComponent;
}());
exports.SummaryFormComponent = SummaryFormComponent;
//# sourceMappingURL=summary-form.component.js.map