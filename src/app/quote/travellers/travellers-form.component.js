"use strict";
/* Using this article as a starting point. Based on reactive/model-driven forms approach http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html#adding-validators*/
var core_1 = require('@angular/core');
var traveller_1 = require('./../../shared/traveller');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var session_service_1 = require('./../../shared/session.service');
var LabelsAndErrorsUtil_1 = require('./../../shared/LabelsAndErrorsUtil');
var TravellersFormComponent = (function () {
    function TravellersFormComponent(formBuilder, activatedRoute, router, sessionService, labelsErrors) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.sessionService = sessionService;
        this.labelsErrors = labelsErrors;
        this.errorMessage = '';
        this.submitted = false;
        //allowNext = !this.model.hasClaimsAndPolicyHistory && this.model.hasClaimsAndPolicyHistory
        this.title = "Tell us a bit about the travellers";
        this.active = true;
        //labels: Label[];
        this.isLoading = true;
    }
    Object.defineProperty(TravellersFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TravellersFormComponent.prototype, "formDiagnostic", {
        get: function () { return JSON.stringify(this.travelForm.value); },
        enumerable: true,
        configurable: true
    });
    TravellersFormComponent.prototype.collectDataFromQuery = function (queryParams) {
        this.affinityId = queryParams["affinityId"];
        this.productCode = queryParams["productCode"];
    };
    TravellersFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 1. attemps get affinityID and productCode from query string
        this.router.routerState.queryParams.subscribe(function (queryParams) {
            return _this.collectDataFromQuery(queryParams);
        });
        if (this.affinityId != null && this.productCode != null) {
            // TODO: get TravelQuote Template
            this.model = new traveller_1.TravelQuote('TRAVELANN', 'TRAVELANN’', new Date(), 0, false, false, false, false, 1, 0);
            this.model.riskType = this.model.productCode == 'TRAVELANN' ? 'TRAVELANN’' : 'TRAVELST';
            this.model.affinityId = Number.parseInt(this.affinityId);
            this.model.productCode = this.productCode;
        }
        // 2. Take the model based on quoteId
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
        //3. Finally get the model from session
        if (this.model == null || this.model == undefined)
            this.model = this.sessionService.get('travelQuote');
        /*
        this.router.routerState.queryParams.subscribe(queryParams=>
          this.quoteId = queryParams["quoteId"]
        );
        */
        if (this.model != null) {
            this.travelForm = this.formBuilder.group({
                hasMedicalConditions: [this.model.hasMedicalConditions, TravellersFormComponent.validateNo],
                hasMedicalTreatment: [this.model.hasMedicalTreatment, TravellersFormComponent.validateNo],
                travelCancellationNeeded: [this.model.travelCancellationNeeded, TravellersFormComponent.validateNo],
                hasClaimsAndPolicyHistory: [this.model.hasClaimsAndPolicyHistory, TravellersFormComponent.validateNo],
                adultsUnder75: [this.model.adultsUnder75, common_1.Validators.required],
                childrenUnder16: [this.model.childrenUnder16, common_1.Validators.required],
                quoteId: this.model.quoteId,
                travelType: this.model.travelType,
                affinityId: this.model.affinityId,
                riskType: this.model.riskType,
                quoteInfo: this.formBuilder.group({
                    productCode: [this.model.productCode, common_1.Validators.required]
                })
            });
            this.travelForm.valueChanges.subscribe(function (data) { return _this.formData = JSON.stringify(data); });
        }
        // If here, redirect to travel landing page (?????)
        /*
        if(this.quoteId!=null)
        {
          this.model = new TravelQuote('TRAVELANN', 'A', new Date(), 0, false, false, false, false, 1, 0 );
          this.model.quoteId = this.quoteId;
          this.model.riskType = this.model.productCode=='TRAVELANN'?'TRAVELANN’':'TRAVELST';
        }
        else
        {
            // Get the affinityId, productCode and travel type and call web service to get travel template
            this.model = new TravelQuote('TLA', 'A', new Date(), 0, false, false, false, false, 1, 0 );
            this.activatedRoute.params.subscribe(params => {
            let affinityId = Number.parseInt(params['affinityId']);
            let productCode = params['productCode'];
            let travelType = params['travelType'];
            this.model.affinityId = affinityId!=null ? affinityId : 0;
            this.model.productCode = productCode!=null ? productCode : this.model.productCode;
            this.model.riskType = this.model.productCode=='TLA'?'Annual':'Short Term';
            this.model.travelType = travelType!=null ? travelType : this.model.travelType;
          });
        }
        */
    };
    TravellersFormComponent.validateNo = function (c) {
        if (c.value == true) {
            return { "invalidTrueValue": true };
        }
        return null;
    };
    TravellersFormComponent.prototype.onSubmit = function () {
        //this.formData = this.travelForm.value; 
        //this.model.adultsUnder75 = this.travelForm.controls["adultsUnder75"].value;
        //this.model.childrenUnder16 = this.travelForm.controls["childrenUnder16"].value;
        // TODO: Save on the DB the quote
        this.model.quoteId = '1214daweqw';
        var hasKey = this.sessionService.has('travelQuote');
        this.sessionService.set('travelQuote', this.model);
        this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.quoteId]);
        // On succes navigate to the next step
        /*if(this.model.quoteId!=null)
          this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage'], { queryParams: { quoteId:this.model.quoteId}});
        
        else if(this.model.travelType!=null)
          this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.affinityId, this.model.productId, this.model.travelType]);
        else
          this.router.navigate(['Products/Individual-and-Family/Travel/Quote/Coverage', this.model.affinityId, this.model.productId]);*/
    };
    TravellersFormComponent = __decorate([
        core_1.Component({
            selector: 'travellers-form',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            templateUrl: './travellers-form.component.html',
            providers: [LabelsAndErrorsUtil_1.LabelsAndErrorsUtil]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, session_service_1.SessionService, LabelsAndErrorsUtil_1.LabelsAndErrorsUtil])
    ], TravellersFormComponent);
    return TravellersFormComponent;
}());
exports.TravellersFormComponent = TravellersFormComponent;
//# sourceMappingURL=travellers-form.component.js.map