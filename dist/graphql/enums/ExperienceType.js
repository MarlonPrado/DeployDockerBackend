"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceType = void 0;
const type_graphql_1 = require("type-graphql");
var ExperienceType;
(function (ExperienceType) {
    ExperienceType["COEVALUATION"] = "COEVALUATION";
    ExperienceType["SELFAPPRAISAL"] = "SELFAPPRAISAL";
    ExperienceType["TRADITIONALVALUATION"] = "TRADITIONALVALUATION";
    ExperienceType["VALUATIONRUBRIC"] = "VALUATIONRUBRIC";
})(ExperienceType || (exports.ExperienceType = ExperienceType = {}));
(0, type_graphql_1.registerEnumType)(ExperienceType, {
    name: "ExperienceType",
    description: "The ExperienceType Register",
});
