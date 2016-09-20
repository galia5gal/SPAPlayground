"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var config_1 = require('./config');
var LabelsErrorsService = (function () {
    function LabelsErrorsService(http) {
        this.http = http;
        //private serviceUrl: string = Config.getEnvironmentVariable('localEndPoint') + '/CMSPages/PlayWebService.asmx';
        this.serviceUrl = config_1.Config.getEnvironmentVariable('localEndPoint') + '/util';
        this.travelLabels = {};
        this.travelErrors = {};
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
    LabelsErrorsService.prototype.getAllLabels = function () {
        console.log(this.serviceUrl + '/labels');
        var test = this.http.get(this.serviceUrl + '/labels');
        console.log(test);
        var label$ = this.http
            .get(this.serviceUrl + "/labels", { headers: this.getHeaders() })
            .map(this.mapLabels)
            .catch(this.handleError);
        return label$;
    };
    LabelsErrorsService.prototype.getAllErrors = function () {
        console.log(this.serviceUrl + '/errorMessages');
        var test = this.http.get(this.serviceUrl + '/errorMessages');
        console.log(test);
        var error$ = this.http
            .get(this.serviceUrl + "/errorMessages", { headers: this.getHeaders() })
            .map(this.mapErrors)
            .catch(this.handleError);
        return error$;
    };
    LabelsErrorsService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    LabelsErrorsService.prototype.addTolabels = function (label) {
        this.travelLabels[label.key] = label;
    };
    LabelsErrorsService.prototype.mapLabels = function (response) {
        var body = response.json();
        // convert the returned jason into observable collection of Label
        return body.map(toLabel) || {};
    };
    LabelsErrorsService.prototype.mapErrors = function (response) {
        var body = response.json();
        return body.map(toError) || {};
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
function toLabel(r) {
    var label = ({
        key: r.ky,
        heading: r.heading,
        helpInfo: r.helpInfo,
        text: r.text
    });
    console.log('Parsed label:', label);
    return label;
}
function toError(r) {
    var error = ({
        key: r.key,
        value: r.value
    });
    console.log('Parsed error:', error);
    return error;
}
//# sourceMappingURL=labelsErrors.service.js.map