"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceLearningType = void 0;
const type_graphql_1 = require("type-graphql");
var ExperienceLearningType;
(function (ExperienceLearningType) {
    ExperienceLearningType["NORMAL"] = "NORMAL";
    ExperienceLearningType["RECOVERY"] = "RECOVERY";
})(ExperienceLearningType || (exports.ExperienceLearningType = ExperienceLearningType = {}));
(0, type_graphql_1.registerEnumType)(ExperienceLearningType, {
    name: "ExperienceLearningType",
    description: "The ExperienceLearningType Register",
});
