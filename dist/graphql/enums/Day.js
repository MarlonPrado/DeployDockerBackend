"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
const type_graphql_1 = require("type-graphql");
var Day;
(function (Day) {
    Day["MONDAY"] = "MONDAY";
    Day["TUESDAY"] = "TUESDAY";
    Day["WEDNESDAY"] = "WEDNESDAY";
    Day["THURSDAY"] = "THURSDAY";
    Day["FRIDAY"] = "FRIDAY";
    Day["SATURDAY"] = "SATURDAY";
    Day["SUNDAY"] = "SUNDAY";
})(Day || (exports.Day = Day = {}));
(0, type_graphql_1.registerEnumType)(Day, {
    name: "Day",
    description: "The Day Register",
});
