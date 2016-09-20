"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var about_component_1 = require('./about.component');
describe('About Component', function () {
    var html = '<my-about></my-about>';
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [about_component_1.AboutComponent, TestComponent] });
        testing_1.TestBed.overrideComponent(TestComponent, { set: { template: html } });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
    });
});
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({ selector: 'test-cmp', template: '' }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
//# sourceMappingURL=about.component.spec.js.map