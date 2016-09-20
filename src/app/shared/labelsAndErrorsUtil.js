"use strict";
var core_1 = require('@angular/core');
var labelsErrors_service_1 = require('./labelsErrors.service');
var LabelsAndErrorsUtil = (function () {
    function LabelsAndErrorsUtil(labelsErrors) {
        var _this = this;
        this.labelsErrors = labelsErrors;
        this.labels = {};
        this.errors = {};
        this.errorMessage = '';
        this.isLabelsLoading = true;
        this.isErrorsLoading = true;
        labelsErrors.getAllLabels().subscribe(function (res) {
            if (res) {
                res.forEach(function (l) {
                    _this.labels[l.key] = l;
                });
            }
        }, function (e) { return _this.errorMessage = e; }, function () { return _this.isLabelsLoading = false; });
        console.log("Labels in LabelsErrorsService" + this.labels);
        labelsErrors.getAllErrors().subscribe(function (res) {
            if (res) {
                res.forEach(function (l) {
                    _this.errors[l.key] = l.value;
                });
            }
        });
    }
    LabelsAndErrorsUtil = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [labelsErrors_service_1.LabelsErrorsService])
    ], LabelsAndErrorsUtil);
    return LabelsAndErrorsUtil;
}());
exports.LabelsAndErrorsUtil = LabelsAndErrorsUtil;
//# sourceMappingURL=labelsAndErrorsUtil.js.map