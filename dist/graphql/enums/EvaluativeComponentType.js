"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluativeComponentType = void 0;
const type_graphql_1 = require("type-graphql");
var EvaluativeComponentType;
(function (EvaluativeComponentType) {
    EvaluativeComponentType["GENERAL"] = "GENERAL";
    EvaluativeComponentType["AREA"] = "AREA";
    EvaluativeComponentType["ASIGNATURE"] = "ASIGNATURE";
})(EvaluativeComponentType || (exports.EvaluativeComponentType = EvaluativeComponentType = {}));
(0, type_graphql_1.registerEnumType)(EvaluativeComponentType, {
    name: 'EvaluativeComponentType',
    description: 'The EvaluativeComponentType Register',
});
