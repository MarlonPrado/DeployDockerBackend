"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLevelCategory = void 0;
const type_graphql_1 = require("type-graphql");
var PerformanceLevelCategory;
(function (PerformanceLevelCategory) {
    PerformanceLevelCategory["SCHOOL"] = "SCHOOL";
    PerformanceLevelCategory["CAMPUS"] = "CAMPUS";
})(PerformanceLevelCategory || (exports.PerformanceLevelCategory = PerformanceLevelCategory = {}));
(0, type_graphql_1.registerEnumType)(PerformanceLevelCategory, {
    name: 'PerformanceLevelCategory',
    description: 'The PerformanceLevelCategory Register',
});
