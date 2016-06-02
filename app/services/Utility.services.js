"use strict";
var UtilityService = (function () {
    function UtilityService() {
    }
    UtilityService.processEmail = function (email) {
        return email.replace(/\./g, ",");
    };
    return UtilityService;
}());
exports.UtilityService = UtilityService;
//# sourceMappingURL=Utility.services.js.map