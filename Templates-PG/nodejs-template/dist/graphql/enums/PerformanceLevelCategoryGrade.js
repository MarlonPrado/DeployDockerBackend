"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLevelCategoryGrade = void 0;
const type_graphql_1 = require("type-graphql");
var PerformanceLevelCategoryGrade;
(function (PerformanceLevelCategoryGrade) {
    PerformanceLevelCategoryGrade["ALL"] = "ALL";
    PerformanceLevelCategoryGrade["SPECIFIC"] = "SPECIFIC";
})(PerformanceLevelCategoryGrade || (exports.PerformanceLevelCategoryGrade = PerformanceLevelCategoryGrade = {}));
(0, type_graphql_1.registerEnumType)(PerformanceLevelCategoryGrade, {
    name: 'PerformanceLevelCategoryGrade',
    description: 'The PerformanceLevelCategoryGrade Register',
});
