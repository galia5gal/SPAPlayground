"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var config_1 = require('./config');
var traveller_1 = require('./traveller');
var LabelsErrorsService = (function () {
    function LabelsErrorsService(http) {
        this.http = http;
        //private serviceUrl: string = Config.getEnvironmentVariable('endPoint') + '/CMSPages/PlayWebService.asmx';
        this.serviceUrl = config_1.Config.getEnvironmentVariable('endPoint') + '/util';
        /*
        this.getAllLabels().subscribe(res=>{
            if(res){
              res.forEach((l) =>{
                this.travelLabels[l.labelKey]=l.labelValue;
              });
              }
            }
        );
        console.log("Labels in LabelsErrorsService" + this.travelLabels);
  
        this.getAllErrors().subscribe(res=>{
            if(res){
                res.forEach((l) =>{
                  this.travelErrors[l.errorKey]=l.errorValue;
              });
            }
          }
        );
        */
    }
    LabelsErrorsService.prototype.getTravelQuote = function (quoteId) {
        var test = this.http.get(this.serviceUrl + '/labels');
        console.log(test);
        var travelQuote$ = this.http
            .get((this.serviceUrl + "/quote/travel/") + quoteId, { headers: this.getHeaders() })
            .map(this.mapTravelQuote)
            .catch(this.handleError);
        return travelQuote$;
    };
    LabelsErrorsService.prototype.mapTravelQuote = function (response) {
        if (response.status == 400 || response.status == 404 || response.status == 500)
            throw new Error('Status: ' + response.status + "; Message:" + response.json());
        var body = response.json();
        /*let travelQuote = <TravelQuote>({
            productCode: body.productCode,
            riskType: body.riskType,
            quoteDate: body.quoteDate,
            affinityId: body.affinityId,
            hasMedicalConditions: body.hasMedicalConditions,
            hasMedicalTreatment: body.hasMedicalTreatment,
            travelCancellationNeeded: body.travelCancellationNeeded,
            hasClaimsAndPolicyHistory: body.hasClaimsAndPolicyHistory,
            adultsUnder75: body.adultsUnder75,
            childrenUnder16: body.childrenUnder16,
            policyStartDate: body.policyStartDate,
            quoteId: body.quoteId,
            userId: body.userId,
            userEmail: body.userEmail,
            isComepleted: body.isComepleted,
            travelType: body.travelType,
            travelStartDate: body.travelStartDate,
            travelEndDate: body.travelEndDate,
            description: body.description,
            numberOfDaysRequiredInPolicyTerm: body.numberOfDaysRequiredInPolicyTerm,
            premiumAmount: body.premiumAmount
        });*/
        var travelQuote = traveller_1.TravelQuote.asTravelQuote(body);
        console.log('Parsed Travel Object:', travelQuote);
        return travelQuote;
    };
    LabelsErrorsService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    LabelsErrorsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // TOD: Dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    LabelsErrorsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LabelsErrorsService);
    return LabelsErrorsService;
}());
exports.LabelsErrorsService = LabelsErrorsService;
//# sourceMappingURL=travel.service.js.map