"use strict";
var Config = (function () {
    function Config() {
    }
    Config.getEnvironmentVariable = function (value) {
        var environment;
        var data = {};
        environment = window.location.hostname;
        switch (environment) {
            case 'localhost':
                data['localEndPoint'] = 'http://localhost/';
                data['apiGatewayEndPoint'] = 'http://localhost:52383/';
                break;
            case 'uat.server.com':
                data['localEndPoint'] = 'https://uat.xxxxx.com/';
                break;
            default:
                data['localEndPoint'] = 'https://dev.xxxx.com/';
        }
        return data[value];
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map