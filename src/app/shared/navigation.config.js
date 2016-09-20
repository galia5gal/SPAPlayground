"use strict";
var core_1 = require('@angular/core');
var navigationItem_1 = require('./navigationItem');
var NavigationConfig = (function () {
    function NavigationConfig() {
        this.navigationMap = {};
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Travellers'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', '', true),
            new navigationItem_1.NavigationItem('Summary', 'Quote', '', true)
        ];
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Travellers/:quoteId'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', '', true),
            new navigationItem_1.NavigationItem('Summary', 'Quote', '', true)
        ];
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Coverage'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
            new navigationItem_1.NavigationItem('Summary', 'Quote', '', true)
        ];
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Coverage/:quoteId'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
            new navigationItem_1.NavigationItem('Summary', 'Quote', '', true)
        ];
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Summary'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
            new navigationItem_1.NavigationItem('Summary', 'Quote', 'Products/Individual-and-Family/Travel/Quote/Summary', false)
        ];
        this.navigationMap['Products/Individual-and-Family/Travel/Quote/Summary/:quoteId'] = [
            new navigationItem_1.NavigationItem('Travellers', 'Travellers', 'Products/Individual-and-Family/Travel/Quote/Travellers', false),
            new navigationItem_1.NavigationItem('Coverage', 'Coverage', 'Products/Individual-and-Family/Travel/Quote/Coverage', false),
            new navigationItem_1.NavigationItem('Summary', 'Quote', 'Products/Individual-and-Family/Travel/Quote/Summary', false)
        ];
    }
    NavigationConfig.prototype.getNavgationMap = function (key, params) {
        var size = Object.keys(params).length;
        var navItems = this.navigationMap[key];
        if (size == 0)
            return navItems;
        navItems.forEach(function (element) {
            element.url = element.url + "/" + params['quoteId'];
        });
    };
    NavigationConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NavigationConfig);
    return NavigationConfig;
}());
exports.NavigationConfig = NavigationConfig;
//# sourceMappingURL=navigation.config.js.map