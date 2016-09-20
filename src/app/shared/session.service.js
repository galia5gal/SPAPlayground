"use strict";
var core_1 = require('@angular/core');
var SessionService = (function () {
    function SessionService() {
        this._session = {};
    }
    SessionService.prototype.set = function (key, value) {
        this._session[key] = value; // You can also json-ize 'value' here
    };
    SessionService.prototype.get = function (key) {
        return this._session[key]; // optionally de-json-ize here
    };
    SessionService.prototype.has = function (key) {
        if (this.get(key))
            return true;
        return false;
    };
    SessionService.prototype.remove = function (key) {
        this._session[key] = null;
    };
    SessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map