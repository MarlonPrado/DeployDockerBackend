"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLevelType = void 0;
const type_graphql_1 = require("type-graphql");
var PerformanceLevelType;
(function (PerformanceLevelType) {
    PerformanceLevelType["QUALITATIVE"] = "QUALITATIVE";
    PerformanceLevelType["QUANTITATIVE"] = "QUANTITATIVE";
})(PerformanceLevelType || (exports.PerformanceLevelType = PerformanceLevelType = {}));
(0, type_graphql_1.registerEnumType)(PerformanceLevelType, {
    name: "PerformanceLevelType",
    description: "The PerformanceLevelType Register",
});
