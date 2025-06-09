"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuationType = void 0;
const type_graphql_1 = require("type-graphql");
var ValuationType;
(function (ValuationType) {
    ValuationType["DEFINITIVE"] = "DEFINITIVE";
    ValuationType["CALCULATE"] = "CALCULATE";
    ValuationType["RECOVERY"] = "RECOVERY";
})(ValuationType || (exports.ValuationType = ValuationType = {}));
(0, type_graphql_1.registerEnumType)(ValuationType, {
    name: "ValuationType",
    description: "The ValuationType Register",
});
